// Vendors
import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';

// Entitys
import { BookEntity, AuthorEntity } from './';

@Table({
    timestamps: false,
})
export class AuthorsInBookEntity extends Model<AuthorsInBookEntity> {
    @Column
    idproducts: number;

    @ForeignKey(() => BookEntity)
    @Column
    bookid: number;

    @ForeignKey(() => AuthorEntity)
    @Column
    authorid: number;
}
