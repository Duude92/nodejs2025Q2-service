import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from '../logger/logger.service';
import { Response, Request } from 'express';

@Injectable()
export class LoggedInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request>();
    const rCode = response.statusCode;
    const message = response.statusMessage;

    return next
      .handle()
      .pipe(
        tap((data) =>
          this.logger.logResponse(
            request.method,
            request.url,
            rCode,
            message,
            data,
          ),
        ),
      );
  }
}
