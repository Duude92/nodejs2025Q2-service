import { Injectable, LoggerService, LogLevel, Scope } from '@nestjs/common';
import { Writable } from 'node:stream';
import { EOL } from 'node:os';
import { styleText } from 'node:util';
import * as process from 'node:process';
import { LOGGING } from '../../appconfig';
import { createWriteStream } from 'node:fs';

export enum MESSAGE_TYPE {
  NORMAL = 'green',
  ERROR = 'red',
  WARNING = 'yellowBright',
  DEBUG = 'blue',
  FATAL = 'redBright',
}

@Injectable({ scope: Scope.TRANSIENT })
export class Logger implements LoggerService {
  private readonly loggingPipes: Writable[];

  constructor() {
    this.loggingPipes = new Array<Writable>();
    if (LOGGING.CONSOLE_LOG) this.loggingPipes.push(process.stdout);
    if (!!LOGGING.LOG_FILE && LOGGING.LOG_FILE.length !== 0)
      this.loggingPipes.push(createWriteStream(LOGGING.LOG_FILE));
  }

  colorLog(message: any, color: MESSAGE_TYPE, ...optionalParams: any[]) {
    const caller = styleText('yellow', `[${optionalParams[0]}]`);
    const colorMessage = styleText(color, message);
    this.writePipes(`${caller} ${colorMessage}`);
  }

  writePipes(message: string) {
    const timestamp = new Date().toLocaleString() + '\t';

    this.loggingPipes.forEach((pipe: Writable) =>
      pipe.write(timestamp + message + EOL),
    );
  }

  getContext(optionalParams: any[]) {
    return optionalParams.length > 0
      ? styleText('yellow', `[${optionalParams[-1]}]`)
      : '';
  }

  log(message: any, ...optionalParams: any[]) {
    const context = this.getContext(optionalParams);
    const logMessage = styleText(
      MESSAGE_TYPE.NORMAL,
      'LOG ' + context + ' ' + styleText(MESSAGE_TYPE.NORMAL, message),
    );
    this.writePipes(logMessage);
  }

  error(message: any, ...optionalParams: any[]) {
    const context = this.getContext(optionalParams);
    let error = optionalParams[0];
    if (context.length === 0) {
      const tempMessage = message as Error;
      message = tempMessage.message;
      error = tempMessage.stack;
    }
    const logError = styleText(
      MESSAGE_TYPE.ERROR,
      'ERROR ' +
        context +
        ' ' +
        styleText(MESSAGE_TYPE.ERROR, message) +
        EOL +
        error,
    );
    this.writePipes(logError);
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
    // this.colorLog(message, MESSAGE_TYPE.FATAL, ...optionalParams);
    this.error(message, ...optionalParams);
  }

  setLogLevels?(levels: LogLevel[]) {
    // throw new Error('Method not implemented.');
  }
}
