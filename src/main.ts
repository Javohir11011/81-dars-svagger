import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    ['/api/docs'],
    basicAuth({
      users: { Admin: 'qwerty123' },
      challenge: true,
    }),
  );
  console.log('Salom');
  console.log('Salom');
  const config = new DocumentBuilder()
    .setTitle('Auth example')
    .setDescription('The Auth API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);
  console.log(`server running ${process.env.PORT}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
