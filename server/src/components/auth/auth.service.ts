// Vendors
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Entitys
import { Users } from './auth.entity';
// Strategy
import { JwtPayload } from 'src/strategy/model/jwt.model';

@Injectable()
export class AuthService {
    constructor(
        @Inject('AUTH_REPOSITORY')
        private readonly AUTH_REPOSITORY: typeof Users,
        private readonly jwtService: JwtService,
    ) {}

    public async findUserByName_boolean(userName: string): Promise<number> {
        const user = await this.AUTH_REPOSITORY.count({
            where: {
                userName: userName,
            },
        });
        return user;
    }

    public async findUserByName_object(userName: string): Promise<Users> {
        const user = await this.AUTH_REPOSITORY.findOne<Users>({
            where: {
                userName: userName,
            },
        });

        if (!user) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'User not found',
            }, 404);
        }

        return user;
    }

    public async findUserByEmail(userEmail: string): Promise<boolean> {
        const user = await this.AUTH_REPOSITORY.findOne<Users>({
            where: {
                userEmail: userEmail,
            },
        });

        if (user) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This email is already used',
            }, 403);
        }

        return false;
    }

    public async create(user: Users): Promise<Users> {
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
            const newUser = bcrypt.hash(user.userPass, saltRounds, async (err, hash) => {
                user.userPass = hash;
                Users.build(user).update({
                    userName: user.userName,
                    userPass: user.userPass,
                    userGender: user.userGender,
                    userRole: user.userRole,
                    userEmail: user.userEmail,
                });
            });
            return newUser;
        }
    }

    public async login(user: Users): Promise<string> {
        let isUser: Users;
        await this.findUserByName_object(user.userName)
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
