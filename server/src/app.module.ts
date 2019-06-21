// Vendors
import { Module } from '@nestjs/common';

// Controllers
import { AppController } from 'src/app.controller';
// Services
import { AppService } from 'src/app.service';
// Modules
import { DatabaseModule } from 'src/database/database.module';
import { BooksModule } from 'src/components/books/books.module';
import { AuthorsModule } from 'src/components/authors/authors.module';
import { BooksAuthorsModule } from 'src/components/booksAuthors/booksAuthors.module';
import { AuthModule } from 'src/components/auth/auth.module';
import { UsersModule } from 'src/components/users/users.module';

@Module({
  imports: [
    BooksAuthorsModule,
    DatabaseModule,
    BooksModule,
    AuthorsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
