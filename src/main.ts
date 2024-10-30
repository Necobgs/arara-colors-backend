import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', // Permita apenas esta origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir cookies
  });

  app.useGlobalPipes( new ValidationPipe({
    transform:true,
    whitelist:true
  }))
  await app.listen(3000);
}
bootstrap();