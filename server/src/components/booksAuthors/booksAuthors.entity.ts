// Vendors
import { Table, Model, Column, PrimaryKey, ForeignKey } from 'sequelize-typescript';

// Entitys
import { Books } from 'src/components/books/books.entity';
import { Authors } from 'src/components/authors/authors.entity';

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
