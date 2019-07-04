// Vendors
import { Table, Model, Column, ForeignKey, PrimaryKey } from 'sequelize-typescript';

// Entitys
import { AuthorsAndBook } from './';

@Table({
    timestamps: false,
})
export class Book extends Model<Book> {
    @PrimaryKey
    @Column
    @ForeignKey(() => AuthorsAndBook)
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
