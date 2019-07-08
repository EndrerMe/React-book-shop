// Vendors
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Services
import { UsersService } from '../../core/services/';
// Entities
import { User } from '../../core/entities/';
// Models
import { PaginationModel } from '../../core/models/';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {}

    @Get('getAll')
    @UseGuards(AuthGuard())
    public async getAll(): Promise<User[]> {
        return await this.usersService.getAll();
    }

    @Post('changeData')
    @UseGuards(AuthGuard())
    public async changeData(@Body() user: User): Promise<User> {
        return await this.usersService.change(user);
    }

    @Post('delete')
    @UseGuards(AuthGuard())
    public async delete(@Body() user: User): Promise<User> {
        return await this.usersService.delete(user);
    }

    @Post('getForPage')
    @UseGuards(AuthGuard())
    public async getForPage(@Body() page: PaginationModel): Promise<User[]> {
        return await this.usersService.getForPage(page.page, page.pageSize);
    }
}
