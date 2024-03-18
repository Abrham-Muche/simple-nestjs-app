import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const swaggerEndpoint = '/api/v1/doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Fans-CRM API')
    .setExternalDoc('Open API JSON', '/api-json')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(swaggerEndpoint, app, document);
  await app.listen(3001);
}
bootstrap();
