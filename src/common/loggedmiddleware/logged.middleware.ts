import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '../logger/logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggedMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: () => void) {
    res.on('close', () => {
      this.logger.log(
        `${req.method}:${req.url}    ${Object.getOwnPropertyNames(req.query).length > 0 ? 'query: ' + JSON.stringify(req.query) : ''}   ${Object.getOwnPropertyNames(req.query).length > 0 ? 'body: ' + JSON.stringify(req.body) : ''}`,
      );
    });
    next();
  }
}
