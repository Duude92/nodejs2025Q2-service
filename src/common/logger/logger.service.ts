import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { Writable } from 'node:stream';
import { EOL } from 'node:os';
import { styleText } from 'node:util';
import { LOGGING } from '../../appconfig';
import fs from 'node:fs';

export enum MESSAGE_TYPE {
  NORMAL = 'green',
  ERROR = 'red',
  WARNING = 'yellowBright',
  DEBUG = 'blue',
  FATAL = 'redBright',
}

@Injectable()
export class Logger implements LoggerService {
  private readonly loggingPipes: Writable[];

  constructor() {
    this.loggingPipes = new Array<Writable>();
    if (LOGGING.CONSOLE_LOG) this.loggingPipes.push(process.stdout);
    if (!!LOGGING.LOG_FILE && LOGGING.LOG_FILE.length !== 0)
      this.loggingPipes.push(fs.createWriteStream(LOGGING.LOG_FILE));
  }

  colorLog(message: any, color: MESSAGE_TYPE, ...optionalParams: any[]) {
    const timestamp = new Date().toLocaleString() + '\t';
    const caller = styleText('yellow', `[${optionalParams[0]}]`);
    const colorMessage = styleText(color, message);
    this.loggingPipes.forEach((pipe: Writable) =>
      pipe.write(timestamp + caller + ' ' + colorMessage + EOL),
    );
  }

  log(message: any, ...optionalParams: any[]) {
    this.colorLog(message, MESSAGE_TYPE.NORMAL, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.colorLog(message, MESSAGE_TYPE.ERROR, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.colorLog(message, MESSAGE_TYPE.WARNING, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.colorLog(message, MESSAGE_TYPE.DEBUG, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.debug(message, ...optionalParams);
  }

  fatal?(message: any, ...optionalParams: any[]) {
    this.colorLog(message, MESSAGE_TYPE.FATAL, ...optionalParams);
  }

  setLogLevels?(levels: LogLevel[]) {
    // throw new Error('Method not implemented.');
  }
}
