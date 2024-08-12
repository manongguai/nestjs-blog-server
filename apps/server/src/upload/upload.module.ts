import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images'),
        filename: (_, file, callback) => {
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
    UserModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('upload/*');
  }
}
