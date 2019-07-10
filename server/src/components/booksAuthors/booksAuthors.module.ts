// Vendors
import { Module } from '@nestjs/common';

// Modules
import { DatabaseModule } from '../../database/database.module';
// Controllers
import { BooksAuthorsController } from './booksAuthors.controller';
// Services
import { BooksAuthorsService } from '../../shared/services/booksAuthors.service';
// Providers
import { booksAuthorsProviders } from './booksAuthors.providers';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [
    DatabaseModule,
    AuthorsModule,
  ],
  controllers: [
    BooksAuthorsController,
  ],
  providers: [
    BooksAuthorsService,
    ...booksAuthorsProviders,
  ],
  exports: [
    BooksAuthorsService,
  ],
})
export class BooksAuthorsModule {}
