import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { winstonLoggerService } from '@/winstonLogger/winstonLogger.service';

interface data<T> {
  data: T;
}

// 相应拦截器
@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor {
  constructor(private readonly logger: winstonLoggerService) {}
  intercept(context, next: CallHandler): Observable<data<T>> {
    return next.handle().pipe(
      map((data) => {
        // this.logger.info('Response', {
        //     data
        // })
        return {
          data,
          status: 0,
          success: true,
          message: '请求成功',
        };
      }),
    );
  }
}
