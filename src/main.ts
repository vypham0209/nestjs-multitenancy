import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Expenso')
    .setDescription('Expenso API ')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http' }, 'JWT-auth')
    .addSecurityRequirements('JWT-auth')
    .build();
  const appDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/api-docs`, app, appDocument);
  await app.listen(3000);
}
bootstrap();
