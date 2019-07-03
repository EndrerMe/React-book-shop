// Vendors
import { Injectable, Inject } from "@nestjs/common";
import { Op } from "sequelize";

// Entities
import { BookEntity } from "./../../core/entities";
// Models
import { AuthorModel, BookModel } from "../models";
// Services
import { AuthorsInBookService } from "../services";

@Injectable()
export class BookRepository {
    constructor(
        @Inject('BookRepository')
        private readonly bookRepository: typeof BookEntity,
        private authorsInBookService: AuthorsInBookService
    ) {}

    public async findAll(): Promise<BookEntity[]> {
        const books = this.bookRepository.findAll<BookEntity>();

        return await books;
    }

    public async findById(bookId: number): Promise<BookEntity> {
        const book = this.bookRepository.findOne<BookEntity>({
            where: {idbooks: bookId},
        });

        return await book;
    }

    public async addNew(book: BookModel): Promise<BookEntity> {
        let newBook: any;
        const authors: AuthorModel[] = book.authors;
        delete book.authors;
        const createdBook = await this.bookRepository.build(book);
        newBook = createdBook.save();

        this.authorsInBookService.createNewRow(authors, newBook);

        return;
    }

    public async change(book: BookModel): Promise<BookEntity> {
        await this.authorsInBookService.chagneRows(book.bookid, book.authors);

        delete book.authors;

        await BookEntity.update({
            title: book.title,
            type: book.type,
            description: book.description,
            price: book.price,
        }, {
            where: {idbooks: book.bookid},
        });

        return;
    }

    public async delete(bookId: number): Promise<BookEntity> {
        await this.authorsInBookService.deleteBook(bookId);

        await BookEntity.destroy({
            where: {
                idbooks: bookId,
            },
        });

        return;
    }

    public async getForPage(limit: number, offset: number): Promise<BookEntity[]> {
        const books = this.bookRepository.findAll<BookEntity>({
            limit: limit,
            offset: offset,
            where: {},
        });

        return books;
    }

    public async findByTitle(title: string): Promise<BookEntity[]> {
        const books = this.bookRepository.findAll<BookEntity>({
            where: {title: title},
        })

        return books;
    }

    public async findByType(type: string): Promise<BookEntity[]> {
        const books = this.bookRepository.findAll<BookEntity>({
            where: {type: type},
        })

        return books;
    }

    public async findByPrice(min: number, max: number): Promise<BookEntity[]> {
        const books = this.bookRepository.findAll<BookEntity>({
            where: {[Op.and]: [{price: {[Op.gt] : +min}}, {price: {[Op.lt] : +max}}]},
        })

        return books;
    }
}