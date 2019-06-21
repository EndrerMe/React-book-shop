// Vendors
import { NestFactory } from '@nestjs/core';

// Modules
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
