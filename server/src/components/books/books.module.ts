// Vendors
import { Module } from '@nestjs/common';

// Controlles
import { BooksController } from './books.controller';
// Providers
import { bookProviders } from '../../core/providers/';
// Modules
import { DatabaseModule } from './../../database/database.module';
import { AuthorsInBookModule } from '../authorsInBook/authorsInBook.module';
// Repositories
import { BookRepository } from './../../core/repositories';
// Services
import { AuthorsInBookService, BooksService } from './../../core/services';

@Module({
  imports: [
    DatabaseModule,
    AuthorsInBookModule,
  ],
  controllers: [
    BooksController,
  ],
  providers: [
    BooksService,
    AuthorsInBookService,
    BookRepository,
    bookProviders,
  ],
})
export class BooksModule {}
