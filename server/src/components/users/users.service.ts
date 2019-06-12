// Vendors
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Entitys
import { Users } from '../auth/auth.entity';

@Injectable()
export class UsersService {

    constructor(
        @Inject('USERS_REPOSITORY') 
        private readonly USERS_REPOSITORY: typeof Users
    ) {}

    public async getAllUsers(): Promise<Users[]> {
        return await this.USERS_REPOSITORY.findAll<Users>()
    }

    public async findUserById(userId: number): Promise<Users> {
        return this.USERS_REPOSITORY.findOne({
            where: {iduser: userId}
        })
    }

    public async changeUser(user: Users): Promise<Users> {
        let isUser: Users;
        await this.findUserById(user.iduser).then((res) => {
            isUser = res
        })

        const saltRounds = 10

        if (isUser) {
            return await bcrypt.hash(user.userPass, saltRounds, async function (err, hash) {
                Users.update({
                    userName: user.userName,
                    userPass: hash,
                    userGender: user.userGender,
                    userRole: user.userRole,
                    userEmail: user.userEmail
                }, {
                    where: {iduser: user.iduser}
                })
            })       
        }

        if (!isUser) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "User not found"
            }, 404);
        }
    }

    public async deleteUser(user: Users): Promise<Users> {
        let isUser: Users;
        await this.findUserById(user.iduser).then((res) => {
            isUser = res
        })  

        if (isUser) {
            await Users.destroy({
                where: {
                    iduser: user.iduser
                }
            })
        }
        if (!isUser) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "User not found"
            }, 404);
        }   
        return 
    }

    public async getUsersForPage(page: number, pageSize: number): Promise<Users[]> {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        
        return await this.USERS_REPOSITORY.findAll<Users>({
            limit: limit,
            offset: offset,
            where: {},
          })
    }

}
