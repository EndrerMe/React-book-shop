// Vendors
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

// Entitys
import { Authors } from './authors.entity';

@Injectable()
export class AuthorsService {
    constructor(
        @Inject('AUTHORS_REPOSITORY')
        private readonly AUTHORS_REPOSITORY: typeof Authors,
    ) {}

    public async findAllAuthors(): Promise<Authors[]> {
        return await this.AUTHORS_REPOSITORY.findAll<Authors>();
    }

    public async addNewAuthor(author: Authors): Promise<Authors> {
        return await Authors.build(author).update({
            authorName: author.authorName,
        });
    }

    public async findAuthorById(authorId): Promise<boolean> {
        const author = this.AUTHORS_REPOSITORY.count({
            where: {idauthors: authorId},
        });

        if (!author) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Author not found',
            }, 404);
        }

        return true;
    }

    public async deleteAuthor(author: Authors): Promise<Authors> {
        let isAuthor: boolean = false;
        await this.findAuthorById(author.idauthors).then((res) => {
            isAuthor = res;
        });

        if (isAuthor) {
            await Authors.destroy({
                where: {
                    idauthors: author.idauthors,
                },
            });
        }

        return;
    }

    public async changeAuthor(author: Authors): Promise<Authors> {
        let isAuthor: boolean = false;

        await this.findAuthorById(author.idauthors).then((res) => {
            isAuthor = res;
        });

        if (isAuthor) {
            Authors.update({
                authorName: author.authorName,
            }, {
                where: {
                    idauthors: author.idauthors,
                    },
                });
        }

        return;
    }
    public async getAuthorsForPage(page: number, pageSize: number): Promise<Authors[]> {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;
        return this.AUTHORS_REPOSITORY.findAll<Authors>({
            limit: limit,
            offset: offset,
            where: {},
          });
    }

    public async findAuthorByName(authorName: string): Promise<number> {
        let isAuthor: any;

        await this.AUTHORS_REPOSITORY.findOne<Authors>({
            where: {
                authorName: authorName,
            },
        }).then((res) => {
            isAuthor = res.idauthors;
        });

        if (isAuthor) {
            return isAuthor;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Book not found',
            }, 404);
        }
    }
}
