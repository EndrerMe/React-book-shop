// Vendors
import { Table, Model, Column, PrimaryKey, ForeignKey } from 'sequelize-typescript';

// Entitys
import { BooksAuthors } from '../booksAuthors/booksAuthors.entity';

@Table({
    timestamps: false
})
export class Authors extends Model<Authors> {
    @PrimaryKey
    @Column
    @ForeignKey(() => BooksAuthors)
    idauthors: number;

    @Column
    authorName: string;
}