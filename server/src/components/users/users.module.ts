// Vendors
import { Module } from '@nestjs/common';

// Controllers
import { UsersController } from './users.controller';
// Modules
import { DatabaseModule } from './../../database/database.module';
// Providers
import { userProviders } from '../../core/providers/';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    userProviders,
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule {}
