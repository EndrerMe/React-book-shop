// Vendors
import { Controller, Post, Body } from '@nestjs/common';

// Entities
import { User } from '../../core/entities/';
// Services
import { AuthService } from '../../core/services/';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('regist')
    public async regist(@Body() user: User): Promise<String> {
        return this.authService.create(user);
    }

    @Post('login')
    public async login(@Body() user: User): Promise<{token: string}> {
        const token = await this.authService.login(user);
        return {token};
    }
}
