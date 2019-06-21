// Vendors
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Models
import { JwtPayload } from './model/jwt.model';
// Services
import { AuthService } from './../components/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private readonly authService: AuthService
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'secretKey',
      });
    }

    // async validate(payload: JwtPayload) {
    //   const user = await this.authService.validateUser(payload);
    //   if (!user) {
    //     throw new UnauthorizedException();
    //   }
    //   return user;
    // }
}