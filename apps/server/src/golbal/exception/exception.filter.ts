import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { winstonLoggerService } from '@/winstonLogger/winstonLogger.service';
import { REQUEST } from '@nestjs/core';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: winstonLoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.error(
      'Error',
      {
        statusCode: status,
        message: exception.message,
      },
      request,
    );
    // console.log(this.logger2);

    // this.logger2.error('Error2')
    response.status(status).json({
      statusCode: status,
      success: false,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
