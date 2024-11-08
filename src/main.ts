import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { BadRequestExceptionFilter } from './common/exceptions/filters/bad-request-exception.filter';
import { NotFoundExceptionFilter } from './common/exceptions/filters/not-found-exception.filter';
import { ConflictExceptionFilter } from './common/exceptions/filters/conflict-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UnauthorizedExceptionFilter } from './common/exceptions/filters/unauthorized-exception.filter';
import { InternalServerErrorExceptionFilter } from './common/exceptions/filters/internal-server-error-exception.filter';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  logger.log('Starting application...');
  const APP_PORT = process.env.PORT ?? 3000;

  const app = await NestFactory.create(AppModule);
  // Setting API Path
  const apiPath = 'api';
  app.setGlobalPrefix(apiPath);
  app.enableCors();
  app.useGlobalFilters(
    new BadRequestExceptionFilter(),
    new NotFoundExceptionFilter(),
    new ConflictExceptionFilter(),
    new UnauthorizedExceptionFilter(),
    new InternalServerErrorExceptionFilter(),
  );

  // Swagger Options
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest-js Movies API')
    .setDescription('Api for users and movies')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // Swagger path: http://localhost:3000/api/docs
  SwaggerModule.setup(`${apiPath}/docs`, app, document);

  await app.listen(APP_PORT, '0.0.0.0');
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
