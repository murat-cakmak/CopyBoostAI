import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GenerateRateLimitGuard } from './guards/generate-rate-limit.guard';
import { AdminGuard } from './guards/admin.guard';
import { Request } from 'express';

type AdminRequest = Request & { user?: { id?: string } };

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

  @Get('admin/users')
  @UseGuards(AdminGuard)
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Patch('admin/users/:id/daily-limit')
  @UseGuards(AdminGuard)
  setDailyLimit(
    @Param('id') id: string,
    @Body() body: { dailyRequestLimit: number },
  ) {
    return this.appService.setUserDailyLimit(id, body.dailyRequestLimit);
  }

  @Patch('admin/users/:id/password')
  @UseGuards(AdminGuard)
  setUserPassword(
    @Param('id') id: string,
    @Body() body: { currentPassword?: string; newPassword: string },
  ) {
    return this.appService.setUserPasswordAsAdmin(
      id,
      body.currentPassword,
      body.newPassword,
    );
  }

  @Post('admin/users/:id/subscription')
  @UseGuards(AdminGuard)
  createSubscription(@Param('id') id: string) {
    return this.appService.createSubscriptionForUser(id);
  }

  @Post('admin/users/:id/subscription/cancel')
  @UseGuards(AdminGuard)
  cancelSubscription(@Param('id') id: string) {
    return this.appService.cancelSubscriptionForUser(id);
  }

  @Delete('admin/users/:id')
  @UseGuards(AdminGuard)
  deleteUser(@Param('id') id: string, @Req() req: AdminRequest) {
    return this.appService.deleteUser(id, req.user?.id);
  }

  @Get('admin/subscriptions')
  @UseGuards(AdminGuard)
  getAllSubscriptions() {
    return this.appService.getAllSubscriptions();
  }

  @Post('auth/register')
  register(
    @Body()
    body: {
      email: string;
      password: string;
      name?: string;
    },
  ) {
    return this.appService.register(body);
  }

  @Post('auth/login')
  login(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    return this.appService.login(body);
  }

  @Get('auth/me')
  me(@Headers('x-user-id') userId?: string) {
    return this.appService.getProfile(userId);
  }

  @Patch('auth/me')
  updateProfile(
    @Headers('x-user-id') userId: string,
    @Body()
    body: { name?: string; currentPassword?: string; newPassword?: string },
  ) {
    return this.appService.updateProfile(body, userId);
  }

  @Post('content/generate')
  @UseGuards(GenerateRateLimitGuard)
  generateContent(
    @Body()
    body: {
      title?: string;
      category?: string;
      platform?: string;
      language?: string;
      tone?: string;
    },
    @Headers('x-user-id') userId?: string,
  ) {
    return this.appService.generateContent(body, userId);
  }

  @Get('content')
  getUserContents(@Headers('x-user-id') userId?: string) {
    return this.appService.getUserContents(userId);
  }
}
