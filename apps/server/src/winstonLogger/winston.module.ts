import { Global, Module } from '@nestjs/common';
import { winstonLoggerService } from './winstonLogger.service';
@Module({
  // imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [winstonLoggerService],
  exports: [winstonLoggerService],
})
export class WinstonLoggerModule {}
