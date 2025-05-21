import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ HABILITAR CORS
  app.enableCors({
    origin: 'http://localhost:4200', // frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ✅ Servir archivos estáticos
  app.use('/frontend', express.static(join(__dirname, '..', 'public')));

  await app.listen(3000);
}
bootstrap();
