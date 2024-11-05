import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('bootstrap');
  logger.log('Starting application...');
  const APP_PORT = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);
  //TODO: No olvides meter acá el resto de la configuración :v

  app.setGlobalPrefix('api/');
  app.enableCors();
  await app.listen(APP_PORT, '0.0.0.0');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
