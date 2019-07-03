// Vendors
import { Table, Model, Column } from 'sequelize-typescript';

@Table({
    timestamps: false,
})
export class UserEntity extends Model<UserEntity> {
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
