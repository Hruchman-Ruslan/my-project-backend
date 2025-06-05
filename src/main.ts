import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const port = app.get(ConfigService).get<number>('PORT') ?? 3030;
  await app.listen(port);
}

void bootstrap();
