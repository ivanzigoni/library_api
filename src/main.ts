import 'dotenv/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const { API_PORT } = process.env;

function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('Library management system API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());

  swagger(app);

  await app.listen(+API_PORT);
}

bootstrap();
