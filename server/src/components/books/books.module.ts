// Vendors
import { Module } from '@nestjs/common';

// Controlles
import { BooksController } from './books.controller';
// Providers
import { bookProviders, authorProviders, booksAuthorsProviders } from '../../core/providers/';
// Modules
import { DatabaseModule } from './../../database/database.module';
// Repositories
import { BookRepository, AuthorsInBookRepository, AuthorRepoitory } from './../../core/repositories';
// Services
import { AuthorsInBookService, BooksService } from './../../core/services';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    BooksController,
  ],
  providers: [
    BooksService,
    AuthorsInBookRepository,
    AuthorsInBookService,
    AuthorRepoitory,
    BookRepository,
    ...bookProviders,
    ...authorProviders,
    ...booksAuthorsProviders,
  ],
})
export class BooksModule {}
