import { HttpExceptionFilter } from './exception.filter';
import { winstonLoggerService } from '@/winstonLogger/winstonLogger.service';
describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter(new winstonLoggerService())).toBeDefined();
  });
});
