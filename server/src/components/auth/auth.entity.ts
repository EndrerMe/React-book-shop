import { Table, Model, Column, PrimaryKey } from 'sequelize-typescript';

@Table({
    timestamps: false,
})
export class Users extends Model<Users> {
    @PrimaryKey
    @Column
    iduser: number;

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
