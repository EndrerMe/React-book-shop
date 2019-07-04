// Vendors
import { Module } from '@nestjs/common';

// Controllers
import { UsersController } from './users.controller';
// Modules
import { DatabaseModule } from './../../database/database.module';
// Providers
import { userProviders } from '../../core/providers/';
// Services
import { UsersService } from './../../core/services';
// Repositories
import { UserRepository } from './../../core/repositories';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    UsersService,
    UserRepository,
    ...userProviders,
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule {}
