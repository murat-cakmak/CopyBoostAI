import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Request, Response } from "express";

type HitInfo = {
  count: number;
  resetAt: number;
};

@Injectable()
export class GenerateRateLimitGuard implements CanActivate {
  private readonly limit =
    Number.parseInt(process.env.GENERATE_DAILY_LIMIT ?? "", 10) || 5;
  private readonly windowMs =
    Number.parseInt(process.env.GENERATE_WINDOW_SECONDS ?? "", 10) * 1000 ||
    24 * 60 * 60 * 1000;
  private readonly hits = new Map<string, HitInfo>();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const key = this.extractClientKey(request);
    const now = Date.now();

    const existing = this.hits.get(key);

    if (!existing || existing.resetAt <= now) {
      this.hits.set(key, { count: 1, resetAt: now + this.windowMs });
      return true;
    }

    if (existing.count >= this.limit) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1000),
      );
      response.setHeader("Retry-After", retryAfterSeconds.toString());
      const hours = Math.max(1, Math.ceil(retryAfterSeconds / 3600));
      const message = `Günlük üretim limitine ulaşıldı. ${hours} saat sonra tekrar deneyin.`;
      throw new HttpException(message, HttpStatus.TOO_MANY_REQUESTS);
    }

    existing.count += 1;
    return true;
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
}
