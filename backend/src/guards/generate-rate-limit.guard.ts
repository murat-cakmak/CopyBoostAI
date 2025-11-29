import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Request, Response } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UsageLog } from "../entities/usage-log.entity";

type HitInfo = {
  count: number;
  resetAt: number;
};

@Injectable()
export class GenerateRateLimitGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(UsageLog)
    private readonly usageLogsRepository: Repository<UsageLog>
  ) {}

  private readonly defaultLimit =
    Number.parseInt(process.env.GENERATE_DAILY_LIMIT ?? "", 10) || 5;

  private readonly hits = new Map<string, HitInfo>();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const key = this.extractClientKey(request);
    const userId = this.extractUserId(request);
    const now = Date.now();

    const effectiveKey = userId || key;
    const existing = this.hits.get(effectiveKey);
    const resetAt =
      existing && existing.resetAt > now ? existing.resetAt : this.getResetTimestamp();
    const inMemoryCount =
      existing && existing.resetAt > now ? existing.count : 0;

    const limit = await this.resolveLimit(userId);
    const usageToday = userId
      ? await this.countUsageToday(userId)
      : 0;
    const totalUsage = usageToday + inMemoryCount;

    if (totalUsage >= limit) {
      const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000));
      response.setHeader("Retry-After", retryAfterSeconds.toString());
      const hours = Math.max(1, Math.ceil(retryAfterSeconds / 3600));
      const message = `Günlük üretim limitine ulaşıldı. ${hours} saat sonra tekrar deneyin.`;
      throw new HttpException(message, HttpStatus.TOO_MANY_REQUESTS);
    }

    this.hits.set(effectiveKey, {
      count: inMemoryCount + 1,
      resetAt,
    });
    return true;
  }

  private async resolveLimit(userId?: string | null): Promise<number> {
    if (!userId) return this.defaultLimit;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) return this.defaultLimit;

    const limit = user.dailyRequestLimit ?? this.defaultLimit;
    return limit > 0 ? limit : this.defaultLimit;
  }

  private async countUsageToday(userId: string): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return this.usageLogsRepository.count({
      where: {
        user: { id: userId },
        requestType: "generate",
        createdAt: Between(start, end),
      },
    });
  }

  private getResetTimestamp(): number {
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    return tomorrow.getTime();
  }

  private extractClientKey(req: Request): string {
    const forwarded = req.headers["x-forwarded-for"];

    if (typeof forwarded === "string" && forwarded.trim().length > 0) {
      return forwarded.split(",")[0].trim();
    }

    if (Array.isArray(forwarded) && forwarded.length > 0) {
      return forwarded[0];
    }

    return req.ip || req.socket.remoteAddress || "unknown";
  }

  private extractUserId(req: Request): string | null {
    const header = req.headers["x-user-id"];
    if (typeof header === "string" && header.trim().length > 0) {
      return header.trim();
    }
    if (Array.isArray(header) && header.length > 0) {
      return header[0];
    }
    return null;
  }
}
