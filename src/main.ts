import { NestFactory } from '@nestjs/core';
import { AppModule } from './microservice/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5050);
}
bootstrap();
