// Vendors
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

// Controllers
import { AuthorsController } from './authors.controller';
// Modules
import { DatabaseModule } from './../../database/database.module';
// Providers
import { authorProviders } from '../../core/providers/';
// Services
import { AuthorsService } from '../../core/services';
// Repositories
import { AuthorRepoitory } from './../../core/repositories';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AuthorsController,
  ],
  providers: [
    ...authorProviders,
    AuthorsService,
    AuthorRepoitory,
  ],
})
export class AuthorsModule {}
