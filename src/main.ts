import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Servir archivos estáticos desde la carpeta "public"
  app.use('/frontend', express.static(join(__dirname, '..', 'public')));

  await app.listen(3000);
}
bootstrap();
