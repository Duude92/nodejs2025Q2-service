import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '../logger/logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggedMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: () => void) {
    res.on('close', () => {
      let endpoint = req.url;
      if (req.route?.path.includes(':id')) {
        const route = req.route.path as string;
        const idx = route.indexOf('/:id');
        endpoint = req.url.substring(0, idx);
      }
      this.logger.logRequest(
        req.method,
        req.url,
        endpoint,
        req.query,
        req.body,
      );
    });
    next();
  }
}
