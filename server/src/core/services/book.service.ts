// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Entities
import { Book } from '../entities';
// Serivces
import { AuthorsInBookService } from './';
// Models
import { BookModel } from '../models/';
// Repositoryes
import { BookRepository } from './../repositories';

@Injectable()
export class BooksService {
    // private bookRepository = new BookRepository();
    constructor(
        private bookRepository: BookRepository,
    ) {

    }

    public async findAll(): Promise<Book[]> {
        return await this.bookRepository.findAll();
    }

    public async findById(id: number): Promise<Book> {
        return await this.bookRepository.findById(id);
    }

    public async addNew(book: BookModel): Promise<Book> {
        return await this.bookRepository.addNew(book);
    }

    public async change(book: BookModel): Promise<Book> {
        let isBook: Book;
        await this.findById(book.bookid).then((res) => {
            isBook = res;
        });
        const changedBook: BookModel = book;

        if (!isBook) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Book not found',
            }, 400);
        }

        if (isBook) {
            this.bookRepository.change(changedBook);
        }

        return;
    }

    public async delete(id: number): Promise<Book> {
        let isBook: Book;

        await this.findById(id).then((res) => {
            isBook = res;
        });

        if (isBook) {
            this.bookRepository.delete(id);
        }

        if (!isBook) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Book not found',
            }, 400);
        }

        return;
    }

    public async getForPage(page: number, pageSize: number): Promise<Book[]> {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        return await this.bookRepository.getForPage(limit, offset);
    }

    public async findByTitle(title: string): Promise<Book[]> {
        let isBook: Book[];

        await this.bookRepository.findByTitle(title).then((res) => {
            isBook = res;
        });

        if (isBook.length) {
            return isBook;
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Book not found',
            }, 400);
        }

    }

    public async findByType(type: string): Promise<Book[]> {
        let isBook: Book[];

        await this.bookRepository.findByType(type).then((res) => {
            isBook = res;
        });

        if (isBook.length) {
            return isBook;
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Book not found',
            }, 400);
        }
    }

    public async findByPrice(price: {min: number, max: number}): Promise<Book[]> {
        let isBook: Book[];

        await this.bookRepository.findByPrice(price.min, price.max).then((res) => {
            isBook = res;
        });

        if (isBook.length) {
            return isBook;
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Book not found',
            }, 400);
        }
    }
}
