import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return this.appService.getHealth();
  }

  @Get()
  getWelcome() {
    return this.appService.getWelcome();
  }

  @Post('content/generate')
  generateContent(
    @Body()
    body: {
      title?: string;
      category?: string;
      platform?: string;
      language?: string;
      tone?: string;
    },
  ) {
    return this.appService.generateContent(body);
  }
}
