// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Entitys
import { AuthorsInBookEntity, BookEntity, AuthorEntity } from '../entities';
// Models
import { AuthorsInBookModel, NewRowBookAuthorsModel, AuthorModel } from '../models/';
// Repository
import { AuthorsInBookКRepository, AuthorRepoitory } from '../repositories';


@Injectable()
export class AuthorsInBookService {

    constructor(
        private authorsInBookКRepository: AuthorsInBookКRepository,
        private authorRepoitory: AuthorRepoitory
        ) {
        }

    public async findAll(): Promise<AuthorsInBookEntity[]> {
        return await this.authorsInBookКRepository.findAll()
    }

    public async getBookById(id: number): Promise<AuthorsInBookEntity> {
        return await this.authorsInBookКRepository.getBookById(id);
    }

    public async createNewRow(authors: AuthorModel[], book: Promise<NewRowBookAuthorsModel>): Promise<AuthorsInBookModel[]>  {
        const bookIdWithAuthorId: AuthorsInBookModel[] = [] as AuthorsInBookModel[];
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
            this.authorsInBookКRepository.createNewRow(bookIdWithAuthorId[i])
        }

        return
    }

    public async getAuthorForBooks(id: number): Promise<AuthorsInBookEntity[]> {
        return await this.authorsInBookКRepository.getAuthorForBooks(id)
    }

    public async deleteBook(id: number): Promise<AuthorsInBookEntity> {
        await this.authorsInBookКRepository.deleteBook(id)

        return;
    }

    public async chagneRows(bookId: number, authors: AuthorEntity[]): Promise<AuthorsInBookEntity[]> {
        const bookIdWithAuthorId: AuthorsInBookModel[] = [] as AuthorsInBookModel[];

        await this.authorsInBookКRepository.deleteBook(bookId)

        for (let i = 0; i < authors.length; i++) {
            bookIdWithAuthorId[i] = {
                bookid: bookId,
                authorid: authors[i].idauthors,
            };
        }

        for (let i = 0; i < bookIdWithAuthorId.length; i++) {
            AuthorsInBookEntity.create(bookIdWithAuthorId[i]);
        }

        return;
    }

    public async findByAuthor(author: string): Promise<AuthorsInBookEntity[]> {
        let authorId: number;
        AuthorsInBookEntity.belongsTo(BookEntity, {targetKey: 'idbooks', foreignKey: 'bookid'});
        await this.authorRepoitory.findByName(author).then((res) => {
            authorId = res;
        });

        if (authorId !== undefined) {
            return await this.authorsInBookКRepository.findAll()
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Book not found',
            }, 400);
        }
    }
}
