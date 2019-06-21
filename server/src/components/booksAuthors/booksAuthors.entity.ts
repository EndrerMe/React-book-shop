// Vendors
import { Table, Model, Column, PrimaryKey, ForeignKey } from 'sequelize-typescript';

// Entitys
import { Books } from '../books/books.entity';
import { Authors } from '../authors/authors.entity';

@Table({
    timestamps: false,
})
export class BooksAuthors extends Model<BooksAuthors> {
    @PrimaryKey
    @Column
    idproducts: number;

    @ForeignKey(() => Books)
    @Column
    bookid: number;

    @ForeignKey(() => Authors)
    @Column
    authorid: number;
}
