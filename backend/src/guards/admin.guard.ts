import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers["x-user-id"];

    const id =
      typeof userId === "string"
        ? userId
        : Array.isArray(userId)
        ? userId[0]
        : null;

    if (!id) {
      throw new UnauthorizedException("Kimlik bilgisi eksik.");
    }

    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException("Kullanıcı bulunamadı.");
    }

    if (user.role !== "admin") {
      throw new ForbiddenException("Admin yetkisi gerekli.");
    }

    // Attach user for downstream use if needed
    request.user = user;
    return true;
  }
}
