import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../logger/logger.service';

//
@Injectable()
@Catch(HttpException)
export class LoggedExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  constructor(private readonly loggerService: Logger) {}

  catch(exception: T, host: ArgumentsHost) {
    this.loggerService.error(exception.message, exception.stack, host);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
