import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { UploadModule } from './upload/upload.module';
import WinstonMiddleware from './winstonLogger/winstonLogger.middleware';
import { WinstonLoggerModule } from './winstonLogger/winston.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './golbal/exception/exception.filter';
import { ValidationPipe } from './golbal/pipes/validation.pipe';
import { ResponseInterceptor } from './golbal/interecptor/response.interceptor';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'kirk958617',
      database: 'nest_template',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ArticleModule,
    UserModule,
    ProfileModule,
    TagModule,
    UploadModule,
    WinstonLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      // 模块级别过滤器
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      // 模块级别过管道
      useClass: ValidationPipe,
    },
    // 模块级别拦截器
    {
      provide: APP_INTERCEPTOR,
      // 模块级别过管道
      useClass: ResponseInterceptor,
    },
  ],
})
// 继承NestModule ，为App添加LoggerMiddleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //  forRoutes()方法可以采用单个字符串、多个字符串、一个RouteInfo对象、一个控制器类甚至多个控制器类。在大多数情况下，您可能只是传递一个以逗号分隔的控制器列表
    consumer
      .apply(WinstonMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
