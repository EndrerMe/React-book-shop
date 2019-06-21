// Vendors
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// Services
import { AuthService } from 'src/components/auth/auth.service';
// Controllers
import { AuthController } from 'src/components/auth/auth.controller';
// Provides
import { authProviders } from 'src/components/auth/auth.provider';
// Modules
import { DatabaseModule } from 'src/database/database.module';
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
    ...authProviders,
  ],
  controllers: [
    AuthController,
  ],
})
export class AuthModule {}
