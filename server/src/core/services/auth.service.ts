// Vendors
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Entitys
import { User } from '../entities/';
// Strategy
import { JwtPayload } from './../../strategy/model/jwt.model';
// Repositories
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
    constructor(
        private authRepository: AuthRepository,
        private readonly jwtService: JwtService,

    ) {}

    public async findUserByName_boolean(userName: string): Promise<number> {
        return this.authRepository.findUserByName_boolean(userName);
    }

    public async findUserByName_object(userName: string): Promise<User> {
        const user = await this.authRepository.findUserByName_object(userName);

        if (!user) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'User not found',
            }, 400);
        }

        return user;
    }

    public async findUserByEmail(userEmail: string): Promise<boolean> {
        const user = this.authRepository.findUserByEmail(userEmail);

        if (user) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This email is already used',
            }, 403);
        }

        return false;
    }

    public async create(user: User): Promise<string> {
        const saltRounds = 10;
        let isUserEmail: boolean = true;
        let isUser: number;
        await this.findUserByEmail(user.userEmail)
        .then((res) => {
            isUserEmail = res;
        });
        await this.findUserByName_boolean(user.userName)
        .then((res) => {
            isUser = res;

        });

        if (isUser) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This user is already used',
            }, 403);
        }

        if (!isUser && !isUserEmail) {
            return this.authRepository.create(user, saltRounds);
        }
    }

    public async login(user: User): Promise<string> {
        let isUser: User;
        await this.authRepository.findUserByName_object(user.userName)
        .then((res) => {
            isUser = res;
        });

        const match = await bcrypt.compare (user.userPass, isUser.userPass);

        if (!match) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Wrong password',
            }, 403);
        }

        if (isUser && match) {
            const user: JwtPayload = {
                idUser: isUser.idUser,
                userName: isUser.userName,
                userEmail: isUser.userEmail,
                userGender: isUser.userGender,
                userRole: isUser.userRole,
            };

            return this.jwtService.sign(user);
        }

    }

}
