// Vendors
import { Injectable, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

// Entities
import { UserEntity } from "../entities";

@Injectable()
export class AuthRepository {
    constructor(
        @Inject('AuthRepository')
        private readonly authRepository: typeof UserEntity,
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

    public async findUserByName_object(userName: string): Promise<UserEntity> {
        const user = await this.authRepository.findOne<UserEntity>({
            where: {
                userName: userName,
            },
        });

        return await user;
    }

    public async findUserByEmail(userEmail: string): Promise<UserEntity> {
        const user = await this.authRepository.findOne<UserEntity>({
            where: {
                userEmail: userEmail,
            },
        });

        return await user;
    }

    public async create(user: UserEntity, saltRounds: number): Promise<UserEntity> {
        const newUser = await bcrypt.hash(user.userPass, saltRounds, async (err, hash) => {
            user.userPass = hash;
            UserEntity.build(user).update({
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