// Vendors
import { Table, Model, Column, PrimaryKey } from 'sequelize-typescript';

@Table({
    timestamps: false,
})
export class User extends Model<User> {
    @PrimaryKey
    @Column
    idUser: number;

    @Column
    userName: string;

    @Column
    userPass: string;

    @Column
    userGender: string;

    @Column
    userRole: string;

    @Column
    userEmail: string;
}
