// Vendors
import { Module } from '@nestjs/common';

// Modules
import { DatabaseModule } from '../../database/database.module';
// Controllers
import { booksAuthorsController } from './booksAuthors.controller';
// Services
import { booksAuthorsService } from '../../shared/services/booksAuthors.service';
// Providers
import { booksAuthorsProviders } from './booksAuthors.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    booksAuthorsController
  ],
  providers: [
    booksAuthorsService,
    ...booksAuthorsProviders
  ],
  exports: [
    booksAuthorsService
  ]
})
export class booksAuthorsModule {}
