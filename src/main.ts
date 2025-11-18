import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const api = await NestFactory.create(AppModule);
  api.enableCors();
  //validadores globais que requerem class-validator e class-transformer
  //utilizamos no formato decorator, ex.: @IsInt(), @IsEmail()
  api.useGlobalPipes(new ValidationPipe({
    whitelist: true, //permitindo apenas campos que estão nos DTO e com decorators, ignorando campos extras
    forbidNonWhitelisted: true //lançando erro caso receba alguma campo inválido
  })) ; 

  await api.listen(process.env.PORT ?? 3000);
}
bootstrap()
