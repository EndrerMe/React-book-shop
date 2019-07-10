// Vendors
import { Module } from '@nestjs/common';

// Controllers
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';
// Modules
import { DatabaseModule } from './database/database.module';
import { BooksModule } from './components/books/books.module';
import { AuthorsModule } from './components/authors/authors.module';
import { BooksAuthorsModule } from './components/booksAuthors/booksAuthors.module';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';

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
