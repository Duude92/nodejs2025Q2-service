import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './appconfig';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { Logger } from './common/logger/logger.service';
import * as process from 'node:process';
import { LoggedExceptionFilter } from './common/loggedexceptionfilter/loggedexception.filter';
import { LoggedInterceptor } from './common/loggedinterceptor/logged.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(Logger);
  app.useLogger(logger);
  process.on('uncaughtException', (err) => logger.fatal(err));
  process.on('unhandledRejection', (err) => logger.fatal(err));

  const ddd = parse(await readFile('./doc/api.yaml', 'utf8')) as OpenAPIObject;
  SwaggerModule.setup('doc', app, ddd, {
    yamlDocumentUrl: 'swagger/yaml',
    jsonDocumentUrl: 'swagger/json',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(app.get(LoggedExceptionFilter));
  app.useGlobalInterceptors(app.get(LoggedInterceptor));
  await app.listen(APP_PORT);
}

bootstrap();
