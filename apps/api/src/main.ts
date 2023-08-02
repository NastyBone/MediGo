/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as tslib from 'tslib';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { UsersService } from './app/repositories/users/users.service';
import process = require('process');
import { AppService } from './app/app.service';
import open = require('open');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //SOCKET
  app.useWebSocketAdapter(new IoAdapter(app));
  //CORS
  app.enableCors({
    credentials: true,
    origin: true,
  });

  // ADMIN
  try {
    // const appService = app.get(AppService)
    // const userService = app.get(UsersService);
    // const result = await userService.insertAdmin(
    //   process.env.ADMIN_EMAIL,
    //   process.env.ADMIN_PASSWORD,
    //   process.env.ADMIN_FIRST_NAME,
    //   process.env.ADMIN_LAST_NAME,
    //   process.env.ADMIN_ROLE
    // );
    // if (result == true) {
    //   await appService.init()
    // } else if (result === false) {
    //   await appService.remove()
    // }
  } catch (error) {
    console.log(error);
  }


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
  // VALIDATION
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
  const port = process.env.DB_PORT || 3333;
  await app.listen(port);
  await open(`http://localhost:${port}`)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
