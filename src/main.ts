import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const api = await NestFactory.create(AppModule);

  //validadores globais que requerem class-validator e class-tra
  //usamos no formato decorator
  api.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  await api.listen(process.env.PORT ?? 3000);
}
bootstrap();
