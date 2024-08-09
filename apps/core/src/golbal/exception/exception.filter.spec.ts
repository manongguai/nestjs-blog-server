import { HttpExceptionFilter } from './exception.filter';
import { winstonLoggerService } from 'src/winstonLogger/winstonLogger.service';
describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter(new winstonLoggerService())).toBeDefined();
  });
});
