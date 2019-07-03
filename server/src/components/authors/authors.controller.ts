// Vendors
import { Controller, Get, Post, Body } from '@nestjs/common';

// Serivces
import { AuthorsService } from '../../core/services/';
// Entities
import { AuthorEntity } from '../../core/entities/';
// Models
import { PaginationModel } from '../../core/models/';

@Controller('authors')
export class AuthorsController {
    constructor(
        private authorsService: AuthorsService,
    ) {}

    @Get('getAll')
    public async getAll(): Promise<AuthorEntity[]> {
        return await this.authorsService.findAll();
    }

    @Post('addNew')
    public async addNew(@Body() author: AuthorEntity): Promise<AuthorEntity> {
        return await this.authorsService.addNew(author);
    }

    @Post('delete')
    public async delete(@Body() author: AuthorEntity): Promise<AuthorEntity> {
        return await this.authorsService.delete(author);
    }

    @Post('change')
    public async change(@Body() author: AuthorEntity): Promise<AuthorEntity> {
        return await this.authorsService.change(author);
    }

    @Post('getForPage')
    public async getForPage(@Body() page: PaginationModel): Promise<AuthorEntity[]> {
        return await this.authorsService.getForPage(page.page, page.pageSize);
    }
}
