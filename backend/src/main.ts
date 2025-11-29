import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) || '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Id'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
