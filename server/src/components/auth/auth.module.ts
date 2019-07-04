// Vendors
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Services
import { AuthService } from '../../core/services/';
// Controllers
import { AuthController } from './auth.controller';
// Provides
import { authProviders } from '../../core/providers/';
// Modules
import { DatabaseModule } from '../../database/database.module';
// Repositories
import { AuthRepository } from './../../core/repositories';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [
    AuthService,
    AuthRepository,
    ...authProviders,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
