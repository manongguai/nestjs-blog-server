import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { winstonLoggerService } from './winstonLogger.service';

@Injectable()
export default class WinstonMiddleware implements NestMiddleware {
  constructor(private readonly logger: winstonLoggerService) {}
  use(req: Request, res: Response, next: NextFunction) {
    // 记录日志
    this.logger.info('Request', undefined, req);
    next();
  }
}
