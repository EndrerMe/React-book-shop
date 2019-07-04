// Vendors
import { Controller, Get, Param, Body, Post } from '@nestjs/common';

// Services
import { AuthorsInBookService } from './../../core/services/';
// Entities
import { AuthorsAndBook } from '../../core/entities';
// Models
import { AuthorsInBookModel } from '../../core/models/';

@Controller('authorsInBook')
export class AuthorsInBookController {
    constructor(
        private authorsInBookService: AuthorsInBookService,
    ) {}

    @Get('getAll')
    public async getAll(): Promise<AuthorsAndBook[]> {
        return await this.authorsInBookService.findAll();
    }

    @Get('getBook/:id')
    public async getBookWidthAuthors(@Param('id') id: number): Promise<AuthorsAndBook> {
        return await this.authorsInBookService.getBookById(id);
    }

    @Post('getAuthorForBooks')
    public async getAuthorForBooks(@Body() id: AuthorsInBookModel): Promise<AuthorsAndBook[]> {
        return this.authorsInBookService.getAuthorForBooks(id.bookid);
    }

    @Post('findByAuthor')
    public async findByAuthor(@Body() author: {author: string}): Promise<AuthorsAndBook[]> {
        return this.authorsInBookService.findByAuthor(author.author);
    }
}
