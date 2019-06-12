// Vendors
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Services
import { AuthService } from './auth.service';
// Controllers
import { AuthController } from './auth.controller';
// Provides
import { authProviders } from './auth.provider';
// Modules
import { DatabaseModule } from './../../database/database.module';
import { PassportModule } from '@nestjs/passport';

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
    ...authProviders
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule {}
