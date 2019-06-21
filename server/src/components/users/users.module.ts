// Vendors
import { Module } from '@nestjs/common';

// Services
import { UsersService } from './users.service';
// Controllers
import { UsersController } from './users.controller';
// Modules
import { DatabaseModule } from './../../database/database.module';
// Providers
import { userProviders } from './users.provider';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers: [
    UsersService,
    ...userProviders,
  ],
  controllers: [
    UsersController,
  ],
})
export class UsersModule {}
