import { Injectable, Inject } from '@nestjs/common';
import * as winston from 'winston';
import { getStackTrace } from '@kirkw/server-utils';
import winstonConfig from '../config/winston.config';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

const logger = winston.createLogger(winstonConfig);
@Injectable()
export class winstonLoggerService {
  error(message: string, params: Record<string, any> = {}, request?: Request) {
    logger.error(this.mergeStackTrace(message, params, request));
  }
  warn(message: string, params: Record<string, any> = {}, request?: Request) {
    logger.warn(this.mergeStackTrace(message, params, request));
  }
  info(message: string, params: Record<string, any> = {}, request?: Request) {
    logger.info(this.mergeStackTrace(message, params, request));
  }
  verbose(
    message: string,
    params: Record<string, any> = {},
    request?: Request,
  ) {
    logger.verbose(this.mergeStackTrace(message, params, request));
  }
  debug(message: string, params: Record<string, any> = {}, request?: Request) {
    logger.debug(this.mergeStackTrace(message, params, request));
  }
  silly(message: string, params: Record<string, any> = {}, request?: Request) {
    logger.silly(this.mergeStackTrace(message, params, request));
  }
  mergeStackTrace(
    message: string,
    params: Record<string, any> = {},
    request?: Request,
  ) {
    const stackTraceInfo = getStackTrace(3);
    return {
      position: stackTraceInfo,
      message: message,
      requestInfo: this.getRequestInfo(request),
      ...params,
    };
  }
  getRequestInfo(request?: Request): Record<string, any> {
    if (!request) {
      return {};
    }
    const {
      query,
      headers,
      url,
      method,
      body,
      connection,
      originalUrl,
      params,
    } = request;
    // 获取 IP
    const xRealIp = headers['X-Real-IP'];
    const xForwardedFor = headers['X-Forwarded-For'];
    const { ip: cIp } = request;
    const { remoteAddress } = connection || {};
    const ip = xRealIp || xForwardedFor || cIp || remoteAddress;
    return {
      originalUrl: originalUrl,
      Method: method,
      IP: ip,
      Parmas: params,
      Query: query,
      Body: body,
    };
  }
}
