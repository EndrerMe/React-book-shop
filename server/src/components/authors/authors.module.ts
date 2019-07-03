// Vendors
import { Module } from '@nestjs/common';

// Controllers
import { AuthorsController } from './authors.controller';
// Modules
import { DatabaseModule } from './../../database/database.module';
// Providers
import { authorProviders } from '../../core/providers/';
// Services
import { AuthorsService } from '../../core/services';
// Repositories
import { AuthorRepoitory } from './../../core/repositories';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    AuthorsController,
  ],
  providers: [
    authorProviders,
    AuthorsService,
    AuthorRepoitory,
  ],
})
export class AuthorsModule {}
