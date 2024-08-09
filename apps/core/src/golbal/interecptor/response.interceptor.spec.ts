import { ResponseInterceptor } from './response.interceptor';
import { winstonLoggerService } from '@/winstonLogger/winstonLogger.service';
import { Test } from '@nestjs/testing';
describe('ResponseInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseInterceptor(new winstonLoggerService())).toBeDefined();
  });
});
