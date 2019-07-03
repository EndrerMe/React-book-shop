// Vendors
import { Injectable, Inject } from "@nestjs/common";

// Entities
import { AuthorsInBookEntity, BookEntity, AuthorEntity } from "./../../core/entities";
// Models
import { AuthorsInBookModel } from "../models";

@Injectable()
export class AuthorsInBookКRepository {

    constructor(
        @Inject('AuthorsInBookRepository')
        private authorsInBookRepository: typeof AuthorsInBookEntity,
        ) {
    }

    public async findAll(): Promise<AuthorsInBookEntity[]> {
        AuthorsInBookEntity.belongsTo(BookEntity, {targetKey: 'idbooks', foreignKey: 'bookid'});
        AuthorsInBookEntity.belongsTo(AuthorEntity, {targetKey: 'idauthors"', foreignKey: 'authorid'});
        
        const products = this.authorsInBookRepository.findAll<AuthorsInBookEntity>({
            include: [BookEntity, AuthorEntity],
        });

        return await products;
    }

    public async getBookById(bookId: number): Promise<AuthorsInBookEntity> {
        AuthorsInBookEntity.belongsTo(BookEntity, {targetKey: 'idbooks', foreignKey: 'bookid'});
        AuthorsInBookEntity.belongsTo(AuthorEntity, {targetKey: 'idauthors', foreignKey: 'authorid'});

        const product = this.authorsInBookRepository.findOne<AuthorsInBookEntity>({
            include: [BookEntity, AuthorEntity],
            where: {idproducts: bookId},
        });

        return await product;
    }

    public async createNewRow(product: AuthorsInBookModel): Promise<AuthorsInBookModel[]> {
        AuthorsInBookEntity.create(product)

        return;
    }

    public async getAuthorForBooks(id: number): Promise<AuthorsInBookEntity[]> {
        AuthorsInBookEntity.belongsTo(AuthorEntity, {targetKey: 'idauthors', foreignKey: 'authorid'});

        const product = this.authorsInBookRepository.findAll<AuthorsInBookEntity>({
            include: [AuthorEntity],
            where: {
                bookid: id,
            },
        });

        return await product;
    }

    public async deleteBook(id: number): Promise<AuthorsInBookEntity> {
        const product = AuthorsInBookEntity.destroy({
            where: {
                bookid: id,
            },
        });

        return;
    }
}