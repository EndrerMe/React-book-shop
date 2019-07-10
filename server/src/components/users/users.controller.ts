// Vendors
import { Controller, Get, Post, Body } from '@nestjs/common';

// Services
import { UsersService } from './users.service';
// Entitys
import { Users } from '../auth/auth.entity';
// Models
import { PaginationModel } from './../../shared/models/pagination.model';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {}

    @Get('getAllUsers')
    public async getAllUsers(): Promise<Users[]> {
        return await this.usersService.getAllUsers();
    }

    @Post('changeUserData')
    public async changeUserData(@Body() user: Users): Promise<Users> {
        return await this.usersService.changeUser(user);
    }

    @Post('deleteUser')
    public async deleteUser(@Body() user: Users): Promise<Users> {
        return await this.usersService.deleteUser(user);
    }

    @Post('getUsersForPage')
    public async getUsersForPage(@Body() page: PaginationModel): Promise<Users[]> {
        return await this.usersService.getUsersForPage(page.page, page.pageSize);
    }
}
