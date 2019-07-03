// Vendors
import { Injectable, Inject } from '@nestjs/common';

import { AuthorEntity } from './../../core/entities';

@Injectable()
export class AuthorRepoitory {
    constructor(
        @Inject('AuthorRepository')
        private readonly authorRepository: typeof AuthorEntity,
    ) {}

    public async findAll(): Promise<AuthorEntity[]> {
        const authors = this.authorRepository.findAll<AuthorEntity>();

        return await authors;
    }

    public async addNew(author: AuthorEntity): Promise<AuthorEntity> {
        await AuthorEntity.build(author).update({
            authorName: author.authorName,
        });

        return;
    }

    public async findById(id: number): Promise<AuthorEntity> {
        const author = this.authorRepository.findOne<AuthorEntity>({
            where: {idauthors: id},
        });

        return await author;
    }

    public async delete(id: number): Promise<AuthorEntity> {
        await AuthorEntity.destroy({
            where: {
                idauthors: id,
            },
        });

        return;
    }

    public async change(author: AuthorEntity): Promise<AuthorEntity> {
        await AuthorEntity.update({
            authorName: author.authorName,
        }, {
            where: {
                idauthors: author.idauthors,
                },
            },
        );

        return;
    }

    public async getForPage(limit: number, offset: number): Promise<AuthorEntity[]> {
        const authors = this.authorRepository.findAll<AuthorEntity>({
            limit: limit,
            offset: offset,
            where: {},
        });

        return await authors;
    }

    public async findByName(name: string): Promise<number> {
        const author: any = this.authorRepository.findOne<AuthorEntity>({
            where: {
                authorName: name,
            },
        });

        const idAuthor = author.idauthors;

        return await idAuthor;
    }
}
