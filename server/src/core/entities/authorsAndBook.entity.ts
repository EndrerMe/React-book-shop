// Vendors
import { Table, Model, Column, ForeignKey, PrimaryKey } from 'sequelize-typescript';

// Entitys
import { Book, Author } from '.';

@Table({
    timestamps: false,
})
export class AuthorsAndBook extends Model<AuthorsAndBook> {
    @PrimaryKey
    @Column
    idproducts: number;

    @ForeignKey(() => Book)
    @Column
    bookid: number;

    @ForeignKey(() => Author)
    @Column
    authorid: number;
}
