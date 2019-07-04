// Vendors
import { Table, Model, Column, ForeignKey, PrimaryKey } from 'sequelize-typescript';

// Entitys
import { AuthorsAndBook } from './';

@Table({
    timestamps: false,
})
export class Author extends Model<Author> {
    @PrimaryKey
    @Column
    @ForeignKey(() => AuthorsAndBook)
    idauthors: number;

    @Column
    authorName: string;
}
