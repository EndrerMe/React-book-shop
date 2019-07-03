// Vendors
import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';

// Entitys
import { AuthorsInBookEntity } from './';

@Table({
    timestamps: false,
})
export class AuthorEntity extends Model<AuthorEntity> {
    @Column
    @ForeignKey(() => AuthorsInBookEntity)
    idauthors: number;

    @Column
    authorName: string;
}
