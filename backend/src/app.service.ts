import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async getHealth() {
    const databaseStatus = await this.usersRepository
      .query('SELECT 1')
      .then(() => 'connected')
      .catch(() => 'unavailable');

    return {
      status: 'ok',
      database: databaseStatus,
      timestamp: new Date().toISOString(),
    };
  }

  getWelcome() {
    return {
      name: 'CopyBoost AI API',
      message: 'NestJS backend hazır. Auth, billing ve content modülleri eklenebilir.',
    };
  }
}
