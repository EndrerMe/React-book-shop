// Vendors
import { Injectable, Inject } from '@nestjs/common';

// Entities
import { AuthorsAndBook, Book, Author } from './../../core/entities';
// Models
import { AuthorsInBookModel } from '../models';

@Injectable()
export class AuthorsInBookRepository {

    constructor(
        @Inject('AuthorsInBookRepository')
        private authorsInBookRepository: typeof AuthorsAndBook,
        ) {
    }

    public async findAll(): Promise<AuthorsAndBook[]> {
        AuthorsAndBook.belongsTo(Book, {targetKey: 'idbooks', foreignKey: 'bookid'});
        AuthorsAndBook.belongsTo(Author, {targetKey: 'idauthors"', foreignKey: 'authorid'});

        const products = this.authorsInBookRepository.findAll<AuthorsAndBook>({
            include: [Book, Author],
        });

        return await products;
    }

    public async getBookById(bookId: number): Promise<AuthorsAndBook> {
        AuthorsAndBook.belongsTo(Book, {targetKey: 'idbooks', foreignKey: 'bookid'});
        AuthorsAndBook.belongsTo(Author, {targetKey: 'idauthors', foreignKey: 'authorid'});

        const product = this.authorsInBookRepository.findOne<AuthorsAndBook>({
            include: [Book, Author],
            where: {idproducts: bookId},
        });

        return await product;
    }

    public async createNewRow(product: AuthorsInBookModel): Promise<AuthorsInBookModel[]> {
        AuthorsAndBook.create(product);

        return;
    }

    public async getAuthorForBooks(id: number): Promise<AuthorsAndBook[]> {
        AuthorsAndBook.belongsTo(Author, {targetKey: 'idauthors', foreignKey: 'authorid'});

        const product = this.authorsInBookRepository.findAll<AuthorsAndBook>({
            include: [Author],
            where: {
                bookid: id,
            },
        });

        return await product;
    }

    public async deleteBook(id: number): Promise<AuthorsAndBook> {
        const product = AuthorsAndBook.destroy({
            where: {
                bookid: id,
            },
        });

        return;
    }
}
