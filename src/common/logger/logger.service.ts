import { Injectable, LoggerService } from '@nestjs/common';
import { Writable } from 'node:stream';
import { EOL } from 'node:os';
import { styleText } from 'node:util';
import * as process from 'node:process';
import { LOGGING } from '../../appconfig';
import { createWriteStream, WriteStream, statSync } from 'node:fs';
import { DataTransformerService } from '../datatransformer/datatransformer.service';
import { join as joinPath } from 'node:path';

export enum MESSAGE_TYPE {
  LOG = 'green',
  ERROR = 'red',
  WARNING = 'yellowBright',
  DEBUG = 'blue',
  FATAL = 'redBright',
}

export enum LOGGED_ITEM {
  LOG = 1,
  DEBUG = 1 << 1,
  WARNING = 1 << 2,
  ERROR = 1 << 3,
  FATAL = 1 << 4,
  VERBOSE = 1 << 5,
  RES_ERROR = 1 << 6,
  RESPONSE = 1 << 7,
  REQUEST = 1 << 8,
}

@Injectable()
export class Logger implements LoggerService {
  private readonly loggingPipes: Writable[];
  private readonly dataTransformerService: DataTransformerService;
  private readonly fileSizeMax: number;
  private readonly loggedItems: LOGGED_ITEM;
  private logFile: WriteStream;

  constructor() {
    this.dataTransformerService = new DataTransformerService();
    this.loggingPipes = new Array<Writable>();
    if (LOGGING.CONSOLE_LOG) this.loggingPipes.push(process.stdout);
    if (!!LOGGING.LOG_FILE && LOGGING.LOG_FILE.length !== 0) {
      this.createLogFile();
      this.fileSizeMax = LOGGING.LOG_SIZE;
    }
    this.loggedItems = LOGGING.LOG_LEVELS;
  }

  createLogFile() {
    const filename = joinPath(
      LOGGING.LOG_FOLDER,
      Date.now() + '-' + LOGGING.LOG_FILE,
    );
    this.logFile = createWriteStream(filename);
    this.loggingPipes.push(this.logFile);
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
    if (this.logFile && statSync(this.logFile.path).size > this.fileSizeMax) {
      const fileIdx = this.loggingPipes.findIndex(
        (pipe) => pipe == this.logFile,
      );
      this.loggingPipes.splice(fileIdx, 1);
      this.logFile.close();
      this.createLogFile();
    }
  }

  getContext(optionalParams: any[]) {
    return optionalParams.length > 0
      ? styleText('yellow', `[${optionalParams[optionalParams.length - 1]}]`)
      : '';
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.loggedItems & LOGGED_ITEM.LOG)
      this.colorLog(message, MESSAGE_TYPE.LOG, 'LOG', optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    if (this.loggedItems & LOGGED_ITEM.ERROR)
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
    if (this.loggedItems & LOGGED_ITEM.WARNING)
      this.colorLog(message, MESSAGE_TYPE.WARNING, 'WARNING', optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    if (this.loggedItems & LOGGED_ITEM.DEBUG)
      this.colorLog(message, MESSAGE_TYPE.DEBUG, 'DEBUG', ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    if (this.loggedItems & LOGGED_ITEM.VERBOSE)
      this.debug(message, ...optionalParams);
  }

  fatal?(message: any, ...optionalParams: any[]) {
    if (this.loggedItems & LOGGED_ITEM.FATAL)
      this.logError(optionalParams, MESSAGE_TYPE.FATAL, message);
  }

  responseError(message: string, stack: string, url: string) {
    if (!(this.loggedItems & LOGGED_ITEM.RES_ERROR)) return;

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
    if (!(this.loggedItems & LOGGED_ITEM.RESPONSE)) return;

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
    if (!(this.loggedItems & LOGGED_ITEM.REQUEST)) return;

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
