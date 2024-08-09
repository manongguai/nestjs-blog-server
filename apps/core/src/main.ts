import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import config from './config/index';
import { HttpExceptionFilter } from './golbal/exception/exception.filter';
import { ResponseInterceptor } from './golbal/interecptor/response.interceptor';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as fs from 'fs';
// 全局使用异常过滤器
const port = config.Port || 3000;
async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    appOptions,
  );
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/kirk',
  });
  // 全局管道
  // app.useGlobalPipes(new ValidationPipe());
  // 异常处理
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 响应拦截器
  // app.useGlobalInterceptors(new ResponseInterceptor())

  const options = new DocumentBuilder()
    .setTitle('NestJS Realworld Example App')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 生成json文件
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('/docs', app, document);

  await app.listen(port);
  console.log('listening to http://localhost:' + port);
  console.log(' view docs on http://localhost:' + port + '/docs');
  console.log(' view docs of json on http://localhost:' + port + '/docs-json');
}
bootstrap();
