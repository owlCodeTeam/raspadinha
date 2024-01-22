import { NestFactory } from '@nestjs/core';
import { AppModule } from './http/app.module';
import { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('raspadinha')
    .setDescription('Documentação raspadinha')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Profile')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'Authorization',
    )
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AppModule],
  });
  SwaggerModule.setup('doc', app, swaggerDoc);
  await app.listen(3000);
}
bootstrap();
