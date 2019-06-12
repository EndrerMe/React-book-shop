// Vendors
import { Controller, Get, Param, Body, Post } from '@nestjs/common';

// Services
import { booksAuthorsService } from '../../shared/services/booksAuthors.service';
// Entitys
import { BooksAuthors } from './booksAuthors.entity';
// Models
import { BookAuthorModel } from './model/booksAuthors.model';

@Controller('booksAuthors')
export class booksAuthorsController {
    constructor(
        private booksAuthorsService: booksAuthorsService
    ) {}

    @Get("getAllBooksAuthors")
    public async getAllbooksAuthors(): Promise<BooksAuthors[]> {
        return await this.booksAuthorsService.findAllBookAndAuthors()
    }

    @Get("getBook/:id")
    public async getBookWidthAuthors(@Param("id") id): Promise<BooksAuthors[]> {
        return await this.booksAuthorsService.getBook(id)
    }

    @Post("getAuthorBooks")
    public async getAuthorBooks(@Body() id: BookAuthorModel): Promise<BooksAuthors[]> {
        return this.booksAuthorsService.getAuthorForBooks(id.bookid)
    }
}
