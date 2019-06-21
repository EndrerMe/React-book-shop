// Vendors
import { Module } from '@nestjs/common';

// Controlles
import { BooksController } from 'src/components/books/books.controller';
// Services
import { BooksService } from 'src/components/books/books.service';
// Providers
import { booksProviders } from 'src/components/books/book.provider';
// Modules
import { DatabaseModule } from 'src/database/database.module';
import {  } from 'src/components/booksAuthors/booksAuthors.module';

@Module({
  imports: [
    DatabaseModule,
    ,
  ],
  controllers: [
    BooksController,
  ],
  providers: [
    BooksService,
    ...booksProviders,
  ],
})
export class BooksModule {}
