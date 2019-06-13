// Vendors
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

// Entitys
import { Books } from './books.entity';
// Serivces
import { booksAuthorsService } from "../../shared/services/booksAuthors.service"
// Models
import { BookModel } from './model/book.model';
import { AuthorModel } from '../booksAuthors/model/Author.model';
import { Op } from 'sequelize';
import { is } from 'bluebird';

@Injectable()
export class BooksService {
    constructor(
        @Inject('BOOKS_REPOSITORY') 
        private readonly BOOKS_REPOSITORY: typeof Books,
        private readonly booksAuthorsService: booksAuthorsService
    ) {}

    public async findAllBooks(): Promise<Books[]> {
        return await this.BOOKS_REPOSITORY.findAll<Books>();
    }

    public async findBookById(id): Promise<Books> {
        let book = await this.BOOKS_REPOSITORY.findOne<Books>({
            where: {idbooks: id}
        })
        
        return book
    }

    public async addNewBook(book: BookModel): Promise<Books> {
        let bookid: any;
        let authors: AuthorModel[] = book.authors;
        delete book.authors;
        let createdBook = await this.BOOKS_REPOSITORY.build(book);
        bookid = createdBook.save()    

        this.booksAuthorsService.createNewRow(authors, bookid)

        return
    }

    public async changeBook(book: BookModel): Promise<Books> {
        let isBook: Books;
        await this.findBookById(book.bookid).then((res) => {
            isBook = res
        })
        let changedBook = book;
        let authorsOfChangedBook = book.authors
        delete changedBook.authors

        if(!isBook) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Book not found"
            }, 404);
        }

        if (isBook) {
            await this.booksAuthorsService.chagneRows(changedBook.bookid, authorsOfChangedBook)

            await Books.update({
                title: changedBook.title,
                type: changedBook.type,
                description: changedBook.description,
                price: changedBook.price
            }, {
                where: {idbooks: changedBook.bookid}
            })
        }
        
        return
    }

    public async deleteBook(id: number): Promise<Books> {
        let isBook: Books;

        await this.findBookById(id).then((res) => {
            isBook = res
        })

        if (isBook) {
            await this.booksAuthorsService.deleteBook(id)
            Books.destroy({
                where: {
                    idbooks: id
                }
            })
        }

        if (!isBook) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Book not found"
            }, 404);
        }

        return
    }

    public async getBookForPage(page: number, pageSize: number): Promise<Books[]> {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        
        return this.BOOKS_REPOSITORY.findAll<Books>({
            limit: limit,
            offset: offset,
            where: {},
          })

    }

    public async findByTitle(title: string): Promise<Books[]> {
        let isBook: Books[];

        await this.BOOKS_REPOSITORY.findAll<Books>({
            where: {title: title}
        }).then((res) => {
            isBook = res
        })

        if (isBook.length) {
            return isBook
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Book not found"
            }, 404);
        }
 
    }

    public async findByType(type: string): Promise<Books[]> {
        let isBook: Books[]; 

        await this.BOOKS_REPOSITORY.findAll<Books>({
            where: {type: type}
        }).then((res) => {
            isBook = res
        })

        if (isBook.length) {
            return isBook
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Book not found"
            }, 404);
        }
 
    }

    public async findByPrice(price: {min: number, max: number}): Promise<Books[]> {
        let isBook: Books[];
        
        let priceRage = {
            min: +price.min,
            max: +price.max
        }

        await this.BOOKS_REPOSITORY.findAll<Books>({
            where: {price: {
                [Op.in]: [priceRage.min, priceRage.max]
            }}
        }).then((res) => {
            isBook = res
        })

        if (isBook.length) {
            return isBook
        }else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Book not found"
            }, 404);
        } 
    }
}
