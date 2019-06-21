// Vendors
import { Controller, Post, Body } from '@nestjs/common';

// Entitys
import { Users } from 'src/components/auth/auth.entity';
// Services
import { AuthService } from 'src/components/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('regist')
    public async regist(@Body() user: Users): Promise<Users> {
        return this.authService.create(user);
    }

    @Post('login')
    public async login(@Body() user: Users): Promise<{token: string}> {
        const token = await this.authService.login(user);
        return {token};
    }
}
