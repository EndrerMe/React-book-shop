// Vendors
import { Injectable, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Entities
import { User } from '../entities';

@Injectable()
export class UserRepository {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: typeof User,
    ) {
        
    }

    public async getAll(): Promise<User[]> {
        const users = this.userRepository.findAll<User>();

        return await users;
    }

    public async findById(userId: number): Promise<User> {
        const user = this.userRepository.findOne({
            where: {idUser: userId},
        });

        return await user;
    }

    public async change(userData: User): Promise<User> {
        const saltRounds = 10;
        bcrypt.hash(userData.userPass, saltRounds, async (err, hash) => {
            User.update({
                userName: userData.userName,
                userPass: hash,
                userGender: userData.userGender,
                userRole: userData.userRole,
                userEmail: userData.userEmail,
            }, {
                where: { idUser: userData.idUser },
            });
        });

        return;
    }

    public async delete(userId: number): Promise<User> {
        const user = User.destroy({
            where: {
                idUser: userId,
            },
        });

        return;
    }

    public async getForPage(limit: number, offset: number): Promise<User[]> {
        const users = this.userRepository.findAll<User>({
            limit: limit,
            offset: offset,
            where: {},
          });

        return await users;
    }
}
