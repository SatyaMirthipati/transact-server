import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  await app.listen(process.env.SERVER_PORT || 8889);
}
bootstrap();
