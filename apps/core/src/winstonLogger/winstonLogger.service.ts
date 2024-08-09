import { Injectable, Inject } from '@nestjs/common';
import * as winston from 'winston';
import { getStackTrace } from '@kirkw/server-utils/getStackInfo';
import winstonConfig from '../config/winston.config';

const logger = winston.createLogger(winstonConfig);
@Injectable()
export class winstonLoggerService {
  error(message: string, params: Record<string, any> = {}) {
    logger.error(this.mergeStackTrace(message, params));
  }
  warn(message: string, params: Record<string, any> = {}) {
    logger.warn(this.mergeStackTrace(message, params));
  }
  info(message: string, params: Record<string, any> = {}) {
    logger.info(this.mergeStackTrace(message, params));
  }
  verbose(message: string, params: Record<string, any> = {}) {
    logger.verbose(this.mergeStackTrace(message, params));
  }
  debug(message: string, params: Record<string, any> = {}) {
    logger.debug(this.mergeStackTrace(message, params));
  }
  silly(message: string, params: Record<string, any> = {}) {
    logger.silly(this.mergeStackTrace(message, params));
  }
  mergeStackTrace(message: string, params: Record<string, any> = {}) {
    const stackTraceInfo = getStackTrace(3);
    return {
      position: stackTraceInfo,
      message: message,
      // requestInfo: this.getRequestInfo(),
      ...params,
    };
  }
  // getRequestInfo(): Record<string, any> {
  //     const { query, headers, url, method, body, connection, originalUrl, params } = this.requestRef;
  //     // 获取 IP
  //     const xRealIp = headers['X-Real-IP'];
  //     const xForwardedFor = headers['X-Forwarded-For'];
  //     const { ip: cIp } = this.requestRef;
  //     const { remoteAddress } = connection || {};
  //     const ip = xRealIp || xForwardedFor || cIp || remoteAddress;
  //     return {
  //         originalUrl: originalUrl,
  //         Method: method,
  //         IP: ip,
  //         Parmas: params,
  //         Query: query,
  //         Body: body
  //     }
  // }
}
