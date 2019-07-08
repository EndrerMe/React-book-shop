// Vendors
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// Modules
import { DatabaseModule } from '../../database/database.module';
import { AuthorsModule } from '../authors/authors.module';
// Controllers
import { AuthorsInBookController } from './authorsInBook.controller';
// Providers
import { booksAuthorsProviders, authorProviders } from '../../core/providers/';
// Services
import { AuthorsInBookService } from './../../core/services';
import { AuthorsInBookRepository, AuthorRepoitory } from './../../core/repositories';

@Module({
  imports: [
    DatabaseModule,
    AuthorsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AuthorsInBookController,
  ],
  providers: [
    AuthorsInBookRepository,
    AuthorRepoitory,
    AuthorsInBookService,
    ...booksAuthorsProviders,
    ...authorProviders,
  ],
})
export class AuthorsInBookModule {}
