import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(+ 3000);
  console.log('APP LISTENING ON PORT ' + PORT);
}

bootstrap();
