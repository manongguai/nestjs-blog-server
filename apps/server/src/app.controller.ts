import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { winstonLoggerService } from './winstonLogger/winstonLogger.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly winstonLoggerService: winstonLoggerService,
  ) {}

  @Get()
  getHello(): string {
    // this.winstonLoggerService.info('12123')
    throw new HttpException('aaa', 400);
    return this.appService.getHello();
  }
}
