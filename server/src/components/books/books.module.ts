// Vendors
import { Module } from '@nestjs/common';

// Controlles
import { BooksController } from './books.controller';
// Services
import { BooksService } from './books.service';
//Providers
import { booksProviders } from './book.provider';
// Modules
import { DatabaseModule } from './../../database/database.module';
import { booksAuthorsModule } from '../booksAuthors/booksAuthors.module';

@Module({
  imports: [
    DatabaseModule,
    booksAuthorsModule
  ],
  controllers: [
    BooksController
  ],
  providers: [
    BooksService,
    ...booksProviders,
  ]
})
export class BooksModule {}
