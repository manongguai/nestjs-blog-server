import { ResponseInterceptor } from './response.interceptor';
import { winstonLoggerService } from 'src/winstonLogger/winstonLogger.service';
describe('ResponseInterceptor', () => {
  it('should be defined', () => {
    expect(new ResponseInterceptor(new winstonLoggerService())).toBeDefined();
  });
});
