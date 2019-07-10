// Vendors
import { Controller, Get, Post, Body } from '@nestjs/common';

// Serivces
import { AuthorsService } from './authors.service';
// Entitys
import { Authors } from './authors.entity';
// Models
import { PaginationModel } from './../../shared/models/pagination.model';

@Controller('authors')
export class AuthorsController {
    constructor(
        private authorsService: AuthorsService,
    ) {}

    @Get('getAllAuthors')
    public async getAllAuthors(): Promise<Authors[]> {
        return await this.authorsService.findAllAuthors();
    }

    @Post('addNewAuthor')
    public async addNewAuthor(@Body() author: Authors): Promise<Authors> {
        return await this.authorsService.addNewAuthor(author);
    }

    @Post('deleteAuthor')
    public async deleteAuthor(@Body() author: Authors): Promise<Authors> {
        return await this.authorsService.deleteAuthor(author);
    }

    @Post('changeAuthor')
    public async changeAuthor(@Body() author: Authors): Promise<Authors> {
        return await this.authorsService.changeAuthor(author);
    }

    @Post('getAuthorsForPage')
    public async getAuthorsForPage(@Body() page: PaginationModel): Promise<Authors[]> {
        return await this.authorsService.getAuthorsForPage(page.page, page.pageSize);
    }
}
