// Vendors
import { Injectable, Inject } from '@nestjs/common';

// Entities
import { Author } from './../../core/entities';

@Injectable()
export class AuthorRepoitory {
    constructor(
        @Inject('AuthorRepository')
        private readonly authorRepository: typeof Author,
    ) {}

    public async findAll(): Promise<Author[]> {
        const authors = this.authorRepository.findAll<Author>();

        return await authors;
    }

    public async addNew(author: Author): Promise<Author> {
        await Author.build(author).update({
            authorName: author.authorName,
        });

        return;
    }

    public async findById(id: number): Promise<Author> {
        const author = this.authorRepository.findOne<Author>({
            where: {idauthors: id},
        });

        return await author;
    }

    public async delete(id: number): Promise<Author> {
        await Author.destroy({
            where: {
                idauthors: id,
            },
        });

        return;
    }

    public async change(author: Author): Promise<Author> {
        await Author.update({
            authorName: author.authorName,
        }, {
            where: {
                idauthors: author.idauthors,
                },
            },
        );

        return;
    }

    public async getForPage(limit: number, offset: number): Promise<Author[]> {
        const authors = this.authorRepository.findAll<Author>({
            limit: limit,
            offset: offset,
            where: {},
        });

        return await authors;
    }

    public async findByName(name: string): Promise<number> {
        const author: Author = await this.authorRepository.findOne<Author>({
            where: {
                authorName: name,
            },
        });

        const idAuthor = author.idauthors;

        return await idAuthor;
    }

}
