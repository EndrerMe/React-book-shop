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
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';
import { AuthorsInBookModule } from './components/authorsInBook/authorsInBook.module';

@Module({
  imports: [
    AuthorsInBookModule,
    DatabaseModule,
    BooksModule,
    AuthorsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
