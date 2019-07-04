// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Entitys
import { Author } from '../entities';
// Repositories
import { AuthorRepoitory } from '../repositories';

@Injectable()
export class AuthorsService {
    constructor(
        private authorRepoitory: AuthorRepoitory,
    ) {}

    public async findAll(): Promise<Author[]> {
        return await this.authorRepoitory.findAll();
    }

    public async addNew(author: Author): Promise<Author> {
        await this.authorRepoitory.addNew(author);

        return;
    }

    public async delete(author: Author): Promise<Author> {
        let isAuthor: Author;
        await this.authorRepoitory.findById(author.idauthors).then((res) => {
            isAuthor = res;
        });

        if (isAuthor) {
            await Author.destroy({
                where: {
                    idauthors: author.idauthors,
                },
            });
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Author not found',
            }, 400);
        }

        return;
    }

    public async change(author: Author): Promise<Author> {
        let isAuthor: Author;

        await this.authorRepoitory.findById(author.idauthors).then((res) => {
            isAuthor = res;
        });

        if (isAuthor) {
            this.authorRepoitory.change(author);
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Author not found',
            }, 400);
        }

        return;
    }
    public async getForPage(page: number, pageSize: number): Promise<Author[]> {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        return this.authorRepoitory.getForPage(limit, offset);
    }

    public async findByName(authorName: string): Promise<number> {
        let isAuthor: number;

        await this.authorRepoitory.findByName(authorName).then((res) => {
            isAuthor = res;
        });

        if (isAuthor) {
            return isAuthor;
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Author not found',
            }, 400);
        }
    }
}
