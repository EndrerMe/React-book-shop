// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Entities
import { User } from '../entities';
// repositories
import { UserRepository } from '../repositories/';

@Injectable()
export class UsersService {

    constructor(
        private userRepository: UserRepository,
    ) {}

    public async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    public async findById(userId: number): Promise<User> {
        return await this.userRepository.findById(userId);
    }

    public async change(user: User): Promise<User> {
        let isUser: User;
        this.userRepository.findById(user.idUser).then((res) => {
            isUser = res;
        });

        if (isUser) {
            return await this.userRepository.change(user);
        }

        if (!isUser) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User not found',
            }, 400);
        }
    }

    public async delete(user: User): Promise<User> {
        let isUser: User;
        await this.userRepository.findById(user.idUser).then((res) => {
            isUser = res;
        });

        if (isUser) {
            await this.userRepository.delete(user.idUser);
        }
        if (!isUser) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User not found',
            }, 400);
        }
        return;
    }

    public async getForPage(page: number, pageSize: number): Promise<User[]> {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        return this.userRepository.getForPage(limit, offset);
    }

}
