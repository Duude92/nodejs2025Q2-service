import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { Writable } from 'node:stream';
import { EOL } from 'node:os';
import { styleText } from 'node:util';
import * as process from 'node:process';
import { LOGGING } from '../../appconfig';
import { createWriteStream } from 'node:fs';
import { DataTransformerService } from '../datatransformer/datatransformer.service';

export enum MESSAGE_TYPE {
  LOG = 'green',
  ERROR = 'red',
  WARNING = 'yellowBright',
  DEBUG = 'blue',
  FATAL = 'redBright',
}

@Injectable()
export class Logger implements LoggerService {
  private readonly loggingPipes: Writable[];
  private readonly dataTransformerService: DataTransformerService;

  constructor() {
    this.dataTransformerService = new DataTransformerService();
    this.loggingPipes = new Array<Writable>();
    if (LOGGING.CONSOLE_LOG) this.loggingPipes.push(process.stdout);
    if (!!LOGGING.LOG_FILE && LOGGING.LOG_FILE.length !== 0)
      this.loggingPipes.push(createWriteStream(LOGGING.LOG_FILE));
  }

  colorLog(
    message: any,
    color: MESSAGE_TYPE,
    level: string,
    ...optionalParams: any[]
  ) {
    const context = this.getContext(optionalParams);
    const logMessage = styleText(
      color,
      level + ' ' + context + ' ' + styleText(color, message),
    );
    this.writePipes(logMessage);
  }

  writePipes(message: string) {
    const timestamp = new Date().toLocaleString() + '\t';

    this.loggingPipes.forEach((pipe: Writable) =>
      pipe.write(timestamp + message + EOL),
    );
  }

  getContext(optionalParams: any[]) {
    return optionalParams.length > 0
      ? styleText('yellow', `[${optionalParams[optionalParams.length - 1]}]`)
      : '';
  }

  log(message: any, ...optionalParams: any[]) {
    this.colorLog(message, MESSAGE_TYPE.LOG, 'LOG', optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logError(optionalParams, MESSAGE_TYPE.ERROR, message);
  }

  private logError(optionalParams: any[], color: MESSAGE_TYPE, message: any) {
    const context = this.getContext(optionalParams);
    let error = optionalParams[0];
    if (context.length === 0) {
      const tempMessage = message as Error;
      message = tempMessage.message;
      error = tempMessage.stack;
    }
    const logError = styleText(
      color,
      'ERROR ' + context + ' ' + styleText(color, message) + EOL + error,
    );
    this.writePipes(logError);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.colorLog(message, MESSAGE_TYPE.WARNING, 'WARNING', optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.colorLog(message, MESSAGE_TYPE.DEBUG, 'DEBUG', ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.debug(message, ...optionalParams);
  }

  fatal?(message: any, ...optionalParams: any[]) {
    this.logError(optionalParams, MESSAGE_TYPE.FATAL, message);
  }

  setLogLevels?(levels: LogLevel[]) {
    // throw new Error('Method not implemented.');
  }

  responseError(message: string, stack: string, url: string) {
    const logMessage = styleText(
      ['bgCyan', 'yellow'],
      `RESPONSE EXCEPTION:    endpoint - ${url}    Exception: ${message}`,
    );
    this.writePipes(logMessage);
  }

  logResponse(
    method: string,
    url: string,
    rCode: number,
    message: string,
    data: object,
  ) {
    const transformedBody = this.dataTransformerService.transform(
      data,
      url,
      false,
    );
    const logMessage = styleText(
      ['bgCyan', 'yellow'],
      `RESPONSE    ${method}:${url}  code:${rCode}  ${!message ? '' : 'message:' + message}${!transformedBody ? '' : '\nData:\n' + JSON.stringify(transformedBody)}`,
    );
    this.writePipes(logMessage);
  }

  logRequest(
    method: string,
    url: string,
    endpoint: string,
    query: object,
    body: any,
  ) {
    const transformedBody = this.dataTransformerService.transform(
      body,
      endpoint,
      true,
      method,
    );
    const logMessage = styleText(
      ['bgCyan', 'yellow'],
      `REQUEST    ${method}:${url}  ${Object.getOwnPropertyNames(query).length > 0 ? 'query: ' + JSON.stringify(query) : ''} ${Object.getOwnPropertyNames(transformedBody).length > 0 ? 'body: ' + JSON.stringify(transformedBody) : ''}`,
    );
    this.writePipes(logMessage);
  }
}
