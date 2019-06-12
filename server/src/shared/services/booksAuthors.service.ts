// Vendors
import { Injectable, Inject } from '@nestjs/common';

// Entitys
import { BooksAuthors } from '../../components/booksAuthors/booksAuthors.entity';
import { Books } from '../../components/books/books.entity';
import { Authors } from '../../components/authors/authors.entity';
// Models
import { BookAuthorModel } from '../../components/booksAuthors/model/booksAuthors.model';
import { AuthorModel } from '../../components/booksAuthors/model/Author.model';

@Injectable()
export class booksAuthorsService {

    constructor(
        @Inject('BooksAuthors_REPOSITORY') 
        private BooksAuthors_REPOSITORY: typeof BooksAuthors
        ) {
        }    

    public async findAllBookAndAuthors(): Promise<BooksAuthors[]> {
        BooksAuthors.belongsTo(Books, {targetKey: "idbooks" ,foreignKey: "bookid"})
        BooksAuthors.belongsTo(Authors, {targetKey: "idauthors" ,foreignKey: "authorid"})
        return await this.BooksAuthors_REPOSITORY.findAll<BooksAuthors>({
            include: [Books, Authors]
        });
    }

    public async getBookById(id: number): Promise<BooksAuthors> {
        BooksAuthors.belongsTo(Books, {targetKey: "idbooks" ,foreignKey: "bookid"})
        BooksAuthors.belongsTo(Authors, {targetKey: "idauthors" ,foreignKey: "authorid"})
        return await this.BooksAuthors_REPOSITORY.findOne<BooksAuthors>({
            include: [Books, Authors],
            where: {idproducts: id}
        })
    }

    public async getBook(id: number): Promise<BooksAuthors[]> {
        BooksAuthors.belongsTo(Books, {targetKey: "idbooks" ,foreignKey: "bookid"})
        BooksAuthors.belongsTo(Authors, {targetKey: "idauthors" ,foreignKey: "authorid"})
        const books = this.BooksAuthors_REPOSITORY.findAll<BooksAuthors>({
            include: [Books, Authors],
            where: {bookid: id}
        })

        return books
    }

    public async createNewRow(authors: AuthorModel[], book) {
        let bookIdWithAuthorId: BookAuthorModel[] = [] as BookAuthorModel[];
        let bookId: number;
        await book.then((res) => {
            bookId = res.null
        })

        for (let i = 0; i < authors.length; i++) {
            bookIdWithAuthorId[i] = {
                bookid: bookId,
                authorid: authors[i].idauthors
            }
        }

        for (let i = 0; i < bookIdWithAuthorId.length; i++) {
            BooksAuthors.create(bookIdWithAuthorId[i])
        }
    }

    public async getAuthorForBooks(id: number): Promise<BooksAuthors[]> {
        BooksAuthors.belongsTo(Authors, {targetKey: "idauthors" ,foreignKey: "authorid"})

        return this.BooksAuthors_REPOSITORY.findAll<BooksAuthors>({
            include: [Authors],
            where: {
                bookid: id
            }
        })
    }

    public async deleteBook(id: number): Promise<BooksAuthors> {
        console.log(id)
        await BooksAuthors.destroy({
            where: {
                bookid: id
            }
        })

        return
    }

    public async chagneRows(bookId: number, authors: Authors[]): Promise<BooksAuthors[]> {
        let bookIdWithAuthorId: BookAuthorModel[] = [] as BookAuthorModel[];
        
        await BooksAuthors.destroy({
            where: {
                bookid: bookId
            }
        })

        for (let i = 0; i < authors.length; i++) {
            bookIdWithAuthorId[i] = {
                bookid: bookId,
                authorid: authors[i].idauthors
            }
        }

        for (let i = 0; i < bookIdWithAuthorId.length; i++) {
            BooksAuthors.create(bookIdWithAuthorId[i])
        }

        return
    }
}
