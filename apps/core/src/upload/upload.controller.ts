import {
  Controller,
  Get,
  Post,
  Res,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ParseFilePipe,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { join } from 'path';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '上传文件' })
  @ApiResponse({ status: 200, description: '上传成功' })
  @ApiProperty({ required: true })
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(ParseFilePipe)
  upload(@UploadedFile() file) {
    return {
      filename: file.filename,
    };
  }
  @ApiOperation({ summary: '下载文件' })
  @ApiResponse({ status: 200, description: '下载成功' })
  @ApiProperty({ required: true })
  @Get('export/:filename')
  downLoad(@Res() res: Response, @Param('filename') filename) {
    const url = join(__dirname, `../images/${filename}`);
    // res
    // console.log(url)
    res.download(url);
    // return  true
  }
}
