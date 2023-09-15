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

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Render('home')
  getHello() {
    const message = this.appService.getHello();
    const port = this.configService.get<string>('PORT');
    return { message, port };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }
}
