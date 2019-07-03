// Vendors
import { Table, Model, Column, ForeignKey, PrimaryKey } from 'sequelize-typescript';

// Entitys
import { AuthorsInBookEntity } from './';

@Table({
    timestamps: false,
})
export class BookEntity extends Model<BookEntity> {
    @PrimaryKey
    @Column
    @ForeignKey(() => AuthorsInBookEntity)
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
