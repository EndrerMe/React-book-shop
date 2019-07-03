// Vendors
import { Controller, Get, Post, Body } from '@nestjs/common';

// Services
import { UsersService } from '../../core/services/';
// Entities
import { UserEntity } from '../../core/entities/';
// Models
import { PaginationModel } from '../../core/models/';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {}

    @Get('getAll')
    public async getAll(): Promise<UserEntity[]> {
        return await this.usersService.getAll();
    }

    @Post('changeData')
    public async changeData(@Body() user: UserEntity): Promise<UserEntity> {
        return await this.usersService.change(user);
    }

    @Post('delete')
    public async delete(@Body() user: UserEntity): Promise<UserEntity> {
        return await this.usersService.delete(user);
    }

    @Post('getForPage')
    public async getForPage(@Body() page: PaginationModel): Promise<UserEntity[]> {
        return await this.usersService.getForPage(page.page, page.pageSize);
    }
}
