/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //CORS
  app.enableCors({
    credentials: true,
    origin: true,
  });

  //COOKIES
  app.use(cookieParser());

  //SWAGGER CONFIG
  const config = new DocumentBuilder()
    .setTitle('MEDIGO API')
    .setDescription('API Endopoints for MEDIGO')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //PREFIX
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(e) {
        console.log(e);
        throw new BadRequestException(
          'Un error ha ocurrido validando los datos'
        );
      },
    })
  );

  //PORT
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
