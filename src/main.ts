import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: '*', // Permite todas as origens
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite todos os métodos HTTP
    allowedHeaders: 'Content-Type, Authorization', // Permite cabeçalhos comuns
  });

  app.useGlobalPipes( new ValidationPipe({
    transform:true,
    whitelist:true
  }))
  await app.listen(3000);
}
bootstrap();