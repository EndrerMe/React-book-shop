// Vendors
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Entities
import { User } from '../entities';

@Injectable()
export class AuthRepository {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepository: typeof User,
        private readonly jwtService: JwtService,
    ) {}

    public async findUserByName_boolean(userName: string): Promise<number> {
        const user = await this.authRepository.count({
            where: {
                userName: userName,
            },
        });
        return await user;
    }

    public async findUserByName_object(userName: string): Promise<User> {
        const user = await this.authRepository.findOne<User>({
            where: {
                userName: userName,
            },
        });

        return await user;
    }

    public async findUserByEmail(userEmail: string): Promise<User> {
        const user = await this.authRepository.findOne<User>({
            where: {
                userEmail: userEmail,
            },
        });

        return await user;
    }

    public async create(user: User, saltRounds: number): Promise<User> {
        const newUser = await bcrypt.hash(user.userPass, saltRounds, async (err, hash) => {
            user.userPass = hash;
            User.build(user).update({
                userName: user.userName,
                userPass: user.userPass,
                userGender: user.userGender,
                userRole: user.userRole,
                userEmail: user.userEmail,
            });
        });

        return await newUser;
    }
}
