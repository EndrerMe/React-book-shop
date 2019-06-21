// Vendors
import { Module } from '@nestjs/common';

// Services
import { UsersService } from 'src/components/users/users.service';
// Controllers
import { UsersController } from 'src/components/users/users.controller';
// Modules
import { DatabaseModule } from 'src/database/database.module';
// Providers
import { userProviders } from 'src/components/users/users.provider';

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
