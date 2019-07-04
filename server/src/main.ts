// Vendors
import { NestFactory } from '@nestjs/core';

// Modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log('app is running on localhost:3001');
  await app.listen(3001);
}
bootstrap();
