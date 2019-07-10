// Vendors
import { Table, Model, Column, PrimaryKey, ForeignKey } from 'sequelize-typescript';

// Entitys
import { BooksAuthors } from '../booksAuthors/booksAuthors.entity';

@Table({
    timestamps: false,
})
export class Books extends Model<Books> {
    @PrimaryKey
    @Column
    @ForeignKey(() => BooksAuthors)
    idbooks: number;

    @Column
    title: string;

    @Column
    type: string;

    @Column
    description: string;

    @Column
    price: number;
}
