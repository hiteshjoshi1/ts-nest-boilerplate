import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // helmet
  app.use(helmet());

  // swagger-options
  const options = new DocumentBuilder()
    .setTitle('Dogs example')
    .setDescription('The DOGS API description')
    .setVersion('1.0')
    .addTag('Dogs')
    .build();

  //swagger
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Input validations
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
