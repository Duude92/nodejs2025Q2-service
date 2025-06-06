import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '../logger/logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggedMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: () => void) {
    res.on('close', () => {
      this.logger.logRequest(req.method, req.url, req.query, req.body);
    });
    next();
  }
}
