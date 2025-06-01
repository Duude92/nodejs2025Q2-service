import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './appconfig';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ddd = parse(await readFile('./doc/api.yaml', 'utf8')) as OpenAPIObject;
  SwaggerModule.setup('doc', app, ddd, {
    yamlDocumentUrl: 'swagger/yaml',
    jsonDocumentUrl: 'swagger/json',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(APP_PORT);
}

bootstrap();
