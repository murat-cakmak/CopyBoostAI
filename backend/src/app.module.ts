import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Subscription } from './entities/subscription.entity';
import { Content } from './entities/content.entity';
import { UsageLog } from './entities/usage-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        database: process.env.DB_NAME || 'copyboost',
        autoLoadEntities: true,
        entities: [User, Subscription, Content, UsageLog],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Subscription, Content, UsageLog]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
