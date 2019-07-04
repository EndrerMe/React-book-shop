// Vendors
import { Injectable, Inject } from '@nestjs/common';
import { Op } from 'sequelize';

// Entities
import { Book } from './../../core/entities';
// Models
import { AuthorModel, BookModel, NewRowBookAuthorsModel } from '../models';
// Services
import { AuthorsInBookService } from '../services';

@Injectable()
export class BookRepository {
    constructor(
        @Inject('BookRepository')
        private readonly bookRepository: typeof Book,
        private authorsInBookService: AuthorsInBookService,
    ) {}

    public async findAll(): Promise<Book[]> {
        const books = this.bookRepository.findAll<Book>();

        return await books;
    }

    public async findById(bookId: number): Promise<Book> {
        const book = this.bookRepository.findOne<Book>({
            where: {idbooks: bookId},
        });

        return await book;
    }

    public async addNew(book: BookModel): Promise<Book> {
        let newBook: Promise<BookModel | NewRowBookAuthorsModel>;
        const authors: AuthorModel[] = book.authors;
        delete book.authors;
        const createdBook = await this.bookRepository.build(book);
        newBook = createdBook.save();

        this.authorsInBookService.createNewRow(authors, newBook);

        return;
    }

    public async change(book: BookModel): Promise<Book> {
        await this.authorsInBookService.chagneRows(book.bookid, book.authors);

        delete book.authors;

        await Book.update({
            title: book.title,
            type: book.type,
            description: book.description,
            price: book.price,
        }, {
            where: {idbooks: book.bookid},
        });

        return;
    }

    public async delete(bookId: number): Promise<Book> {
        await this.authorsInBookService.deleteBook(bookId);

        await Book.destroy({
            where: {
                idbooks: bookId,
            },
        });

        return;
    }

    public async getForPage(limit: number, offset: number): Promise<Book[]> {
        const books = this.bookRepository.findAll<Book>({
            limit: limit,
            offset: offset,
            where: {},
        });

        return await books;
    }

    public async findByTitle(title: string): Promise<Book[]> {
        const books = this.bookRepository.findAll<Book>({
            where: {title: title},
        });

        return books;
    }

    public async findByType(type: string): Promise<Book[]> {
        const books = this.bookRepository.findAll<Book>({
            where: {type: type},
        });

        return books;
    }

    public async findByPrice(min: number, max: number): Promise<Book[]> {
        const books = this.bookRepository.findAll<Book>({
            where: {[Op.and]: [{price: {[Op.gt] : +min}}, {price: {[Op.lt] : +max}}]},
        });

        return books;
    }
}
