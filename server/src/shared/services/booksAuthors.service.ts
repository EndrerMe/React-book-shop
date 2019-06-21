// Vendors
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

// Entitys
import { BooksAuthors } from 'src/components/booksAuthors/booksAuthors.entity';
import { Books } from 'src/components/books/books.entity';
import { Authors } from 'src/components/authors/authors.entity';
// Models
import { BookAuthorModel } from 'src/components/booksAuthors/model/booksAuthors.model';
import { AuthorModel } from 'src/components/booksAuthors/model/Author.model';
import { AuthorsService } from 'src/components/authors/authors.service';

@Injectable()
export class BooksAuthorsService {

    constructor(
        @Inject('BooksAuthors_REPOSITORY') private BooksAuthors_REPOSITORY: typeof BooksAuthors,
        private authorsService: AuthorsService,
        ) {
        }

    public async findAllBookAndAuthors(): Promise<BooksAuthors[]> {
        BooksAuthors.belongsTo(Books, {targetKey: 'idbooks' , foreignKey: 'bookid'});
        BooksAuthors.belongsTo(Authors, {targetKey: 'idauthors' , foreignKey: 'authorid'});
        return await this.BooksAuthors_REPOSITORY.findAll<BooksAuthors>({
            include: [Books, Authors],
        });
    }

    public async getBookById(id: number): Promise<BooksAuthors> {
        BooksAuthors.belongsTo(Books, {targetKey: 'idbooks' , foreignKey: 'bookid'});
        BooksAuthors.belongsTo(Authors, {targetKey: 'idauthors', foreignKey: 'authorid'});
        return await this.BooksAuthors_REPOSITORY.findOne<BooksAuthors>({
            include: [Books, Authors],
            where: {idproducts: id},
        });
    }

    public async getBook(id: number): Promise<BooksAuthors[]> {
        BooksAuthors.belongsTo(Books, {targetKey: 'idbooks' , foreignKey: 'bookid'});
        BooksAuthors.belongsTo(Authors, {targetKey: 'idauthors', foreignKey: 'authorid'});
        const books = this.BooksAuthors_REPOSITORY.findAll<BooksAuthors>({
            include: [Books, Authors],
            where: {bookid: id},
        });

        return books;
    }

    public async createNewRow(authors: AuthorModel[], book) {
        const bookIdWithAuthorId: BookAuthorModel[] = [] as BookAuthorModel[];
        let bookId: number;
        await book.then((res) => {
            bookId = res.null;
        });

        for (let i = 0; i < authors.length; i++) {
            bookIdWithAuthorId[i] = {
                bookid: bookId,
                authorid: authors[i].idauthors,
            };
        }

        for (let i = 0; i < bookIdWithAuthorId.length; i++) {
            BooksAuthors.create(bookIdWithAuthorId[i]);
        }
    }

    public async getAuthorForBooks(id: number): Promise<BooksAuthors[]> {
        BooksAuthors.belongsTo(Authors, {targetKey: 'idauthors' , foreignKey: 'authorid'});

        return this.BooksAuthors_REPOSITORY.findAll<BooksAuthors>({
            include: [Authors],
            where: {
                bookid: id,
            },
        });
    }

    public async deleteBook(id: number): Promise<BooksAuthors> {
        await BooksAuthors.destroy({
            where: {
                bookid: id,
            },
        });

        return;
    }

    public async chagneRows(bookId: number, authors: Authors[]): Promise<BooksAuthors[]> {
        const bookIdWithAuthorId: BookAuthorModel[] = [] as BookAuthorModel[];
        await BooksAuthors.destroy({
            where: {
                bookid: bookId,
            },
        });

        for (let i = 0; i < authors.length; i++) {
            bookIdWithAuthorId[i] = {
                bookid: bookId,
                authorid: authors[i].idauthors,
            };
        }

        for (let i = 0; i < bookIdWithAuthorId.length; i++) {
            BooksAuthors.create(bookIdWithAuthorId[i]);
        }

        return;
    }

    public async findByAuthor(author: string): Promise<BooksAuthors[]> {
        let authorId: number;
        BooksAuthors.belongsTo(Books, {targetKey: 'idbooks', foreignKey: 'bookid'});
        const isAuthor = await this.authorsService.findAuthorByName(author).then((res) => {
            authorId = res;
        });

        if (authorId !== undefined) {
            return await this.BooksAuthors_REPOSITORY.findAll<BooksAuthors>({
                include: [Books],
                where: {
                    authorid: authorId,
                },
            });
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Book not found',
            }, 404);
        }
    }
}
