// Vendors
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Serivces
import { AuthorsService } from '../../core/services/';
// Entities
import { Author } from '../../core/entities/';
// Models
import { PaginationModel } from '../../core/models/';

@Controller('authors')
export class AuthorsController {
    constructor(
        private authorsService: AuthorsService,
    ) {}

    @Get('getAll')
    @UseGuards(AuthGuard())
    public async getAll(): Promise<Author[]> {
        return await this.authorsService.findAll();
    }

    @Post('addNew')
    @UseGuards(AuthGuard())
    public async addNew(@Body() author: Author): Promise<Author> {
        return await this.authorsService.addNew(author);
    }

    @Post('delete')
    @UseGuards(AuthGuard())
    public async delete(@Body() author: Author): Promise<Author> {
        return await this.authorsService.delete(author);
    }

    @Post('change')
    @UseGuards(AuthGuard())
    public async change(@Body() author: Author): Promise<Author> {
        return await this.authorsService.change(author);
    }

    @Post('getForPage')
    public async getForPage(@Body() page: PaginationModel): Promise<Author[]> {
        return await this.authorsService.getForPage(page.page, page.pageSize);
    }
}
