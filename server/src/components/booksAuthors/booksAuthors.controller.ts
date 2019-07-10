// Vendors
import { Controller, Get, Param, Body, Post } from '@nestjs/common';

// Services
import { BooksAuthorsService } from '../../shared/services/booksAuthors.service';
// Entitys
import { BooksAuthors } from './booksAuthors.entity';
// Models
import { BookAuthorModel } from './model/booksAuthors.model';

@Controller('booksAuthors')
export class BooksAuthorsController {
    constructor(
        private booksAuthorsService: BooksAuthorsService,
    ) {}

    @Get('getAllBooksAuthors')
    public async getAllbooksAuthors(): Promise<BooksAuthors[]> {
        return await this.booksAuthorsService.findAllBookAndAuthors();
    }

    @Get('getBook/:id')
    public async getBookWidthAuthors(@Param('id') id: number): Promise<BooksAuthors[]> {
        return await this.booksAuthorsService.getBook(id);
    }

    @Post('getAuthorBooks')
    public async getAuthorBooks(@Body() id: BookAuthorModel): Promise<BooksAuthors[]> {
        return this.booksAuthorsService.getAuthorForBooks(id.bookid);
    }

    @Post('findByAuthor')
    public async findByAuthor(@Body() author: {author: string}): Promise<BooksAuthors[]> {
        return this.booksAuthorsService.findByAuthor(author.author);
    }
}
