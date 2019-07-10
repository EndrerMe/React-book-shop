// Vendors
import { Module } from '@nestjs/common';

// Controllers
import { AuthorsController } from './authors.controller';
// Services
import { AuthorsService } from './authors.service';
// Modules
import { DatabaseModule } from './../../database/database.module';
// Providers
import { authorsProviders } from './authors.provier';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    AuthorsController,
  ],
  providers: [
    AuthorsService,
    ...authorsProviders,
  ],
  exports: [
    AuthorsService,
  ],
})
export class AuthorsModule {}
