import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Get()
  @Render('home')
  getHello() {
    const message = this.appService.getHello();
    const port = this.configService.get<string>('PORT');
    return { message, port };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
