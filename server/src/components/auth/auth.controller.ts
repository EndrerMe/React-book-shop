// Vendors
import { Controller, Post, Body } from '@nestjs/common';

// Entities
import { UserEntity } from '../../core/entities/';
// Services
import { AuthService } from '../../core/services/';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('regist')
    public async regist(@Body() user: UserEntity): Promise<UserEntity> {
        return this.authService.create(user);
    }

    @Post('login')
    public async login(@Body() user: UserEntity): Promise<{token: string}> {
        const token = await this.authService.login(user);
        return {token};
    }
}
