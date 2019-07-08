// Vendors
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

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
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
