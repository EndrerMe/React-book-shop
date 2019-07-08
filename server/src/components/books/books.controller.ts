// Vendors
import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Services
import { BooksService } from '../../core/services/';
// Entities
import { Book } from '../../core/entities/';
// Models
import { BookModel, PaginationModel } from '../../core/models/';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ) {}

    @Get('getAll')
    public async getAll(): Promise<Book[]> {
        return await this.booksService.findAll();
    }

    @Get('getById/:id')
    public async findById(@Param('id') id: number): Promise<Book> {
        return await this.booksService.findById(id);
    }

    @Post('addNew')
    @UseGuards(AuthGuard())
    public async addNew(@Body() book: BookModel): Promise<Book> {
        return await this.booksService.addNew(book);
    }

    @Post('chagne')
    @UseGuards(AuthGuard())
    public async chagne(@Body() book: BookModel): Promise<Book> {
        return await this.booksService.change(book);
    }

    @Post('delete')
    @UseGuards(AuthGuard())
    public async delete(@Body() bookid: {id: number}): Promise<Book> {
        return await this.booksService.delete(bookid.id);
    }

    @Post('getForPage')
    public async getForPage(@Body() page: PaginationModel): Promise<Book[]> {
        return await this.booksService.getForPage(page.page, page.pageSize);
    }

    @Post('findByTitle')
    public async findByTitle(@Body() title: {title: string}): Promise<Book[]> {
        return await this.booksService.findByTitle(title.title);
    }

    @Post('findByPrice')
    public async findByPrice(@Body() price: {min: number, max: number}): Promise<Book[]> {
        return await this.booksService.findByPrice(price);
    }

    @Post('findByType')
    public async findByType(@Body() type: {type: string}): Promise<Book[]> {
        return await this.booksService.findByType(type.type);
    }
}
