// Vendors
import { Module } from '@nestjs/common';

// Modules
import { DatabaseModule } from 'src/database/database.module';
import { AuthorsModule } from 'src/components/authors/authors.module';
// Controllers
import { BooksAuthorsController } from 'src/components/booksAuthors/booksAuthors.controller';
// Services
import { BooksAuthorsService } from 'src/shared/services/booksAuthors.service';
// Providers
import { booksAuthorsProviders } from 'src/components/booksAuthors/booksAuthors.providers';

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
