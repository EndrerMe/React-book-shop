// Vendors
import { Controller, Get, Param, Post, Body } from '@nestjs/common';

// Services
import { BooksService } from 'src/components/books/books.service';
// Entitys
import { Books } from 'src/components/books/books.entity';
// Models
import { BookModel } from 'src/components/books/model/book.model';
import { PaginationModel } from 'src/shared/models/pagination.model';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ) {}

    @Get('getAllBooks')
    public async getAllBooks(): Promise<Books[]> {
        return await this.booksService.findAllBooks();
    }

    @Get('getBookById/:id')
    public async findBookById(@Param('id') id): Promise<Books> {
        return await this.booksService.findBookById(id);
    }

    @Post('addNewBook')
    public async addNewBook(@Body() book: BookModel): Promise<Books> {
        return await this.booksService.addNewBook(book);
    }

    @Post('chagneBook')
    public async chagneBook(@Body() book: BookModel): Promise<Books> {
        return await this.booksService.changeBook(book);
    }

    @Post('deleteBook')
    public async deleteBook(@Body() bookid: {id: number}): Promise<Books> {
        return await this.booksService.deleteBook(bookid.id);
    }

    @Post('getBookForPage')
    public async getBookForPage(@Body() page: PaginationModel): Promise<Books[]> {
        return await this.booksService.getBookForPage(page.page, page.pageSize);
    }

    @Post('findByTitle')
    public async findByTitle(@Body() title: {title: string}): Promise<Books[]> {
        return await this.booksService.findByTitle(title.title);
    }

    @Post('findByPrice')
    public async findByPrice(@Body() price: {min: number, max: number}): Promise<Books[]> {
        return await this.booksService.findByPrice(price);
    }

    @Post('findByType')
    public async findByType(@Body() type: {type: string}): Promise<Books[]> {
        return await this.booksService.findByType(type.type);
    }
}
