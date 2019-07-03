// Vendors
import { Injectable, Inject } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

// Entities
import { UserEntity } from "../entities";

@Injectable()
export class UserRepository {
    constructor (
        @Inject('UserRepository')
        private readonly userRepository: typeof UserEntity,
    ) {
        
    }

    public async getAll(): Promise<UserEntity[]> {
        const users = this.userRepository.findAll<UserEntity>();

        return await users;
    }

    public async findById(userId: number): Promise<UserEntity> {
        const user = this.userRepository.findOne({
            where: {idUser: userId},
        });

        return await user;
    }

    public async change(userData: UserEntity): Promise<UserEntity> {
        const saltRounds = 10;
        const user = bcrypt.hash(userData.userPass, saltRounds, async (err, hash) => {
            UserEntity.update({
                userName: user.userName,
                userPass: hash,
                userGender: user.userGender,
                userRole: user.userRole,
                userEmail: user.userEmail,
            }, {
                where: {idUser: user.idUser},
            });
        });

        return await user;
    }

    public async delete(userId: number): Promise<UserEntity> {
        const user = UserEntity.destroy({
            where: {
                idUser: userId,
            },
        });

        return;
    }

    public async getForPage(limit: number, offset: number): Promise<UserEntity[]> {
        const users = this.userRepository.findAll<UserEntity>({
            limit: limit,
            offset: offset,
            where: {},
          });

        return await users;  
    }
}