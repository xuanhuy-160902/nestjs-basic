import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Get()
  @Render('home')
  getHello() {
    const message = this.appService.getHello();
    const port = this.configService.get<string>('PORT');
    return { message, port };
  }
}
