// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Entities
import { UserEntity } from '../entities';
// repositories
import { UserRepository } from '../repositories/';

@Injectable()
export class UsersService {

    constructor(
        private userRepository: UserRepository
    ) {}

    public async getAll(): Promise<UserEntity[]> {
        return await this.userRepository.getAll()
    }

    public async findById(userId: number): Promise<UserEntity> {
        return await this.userRepository.findById(userId)
    }

    public async change(user: UserEntity): Promise<UserEntity> {
        let isUser: UserEntity;
        this.userRepository.findById(user.idUser).then((res) => {
            isUser = res;
        })

        if (isUser) {
            return await this.userRepository.change(user)
        }

        if (!isUser) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User not found',
            }, 400);
        }
    }

    public async delete(user: UserEntity): Promise<UserEntity> {
        let isUser: UserEntity;
        await this.userRepository.findById(user.idUser).then((res) => {
            isUser = res;
        })

        if (isUser) {
            await this.userRepository.delete(user.idUser)
        }
        if (!isUser) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User not found',
            }, 400);
        }
        return;
    }

    public async getForPage(page: number, pageSize: number): Promise<UserEntity[]> {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        return await this.userRepository.getForPage(limit, offset)
    }

}
