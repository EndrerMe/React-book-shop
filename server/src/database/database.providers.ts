// Vendors
import { Sequelize } from 'sequelize-typescript';

// Entitys
import { BooksAuthors } from '../components/booksAuthors/booksAuthors.entity';
import { Books } from './../components/books/books.entity';
import { Authors } from './../components/authors/authors.entity';
import { Users } from './../components/auth/auth.entity';

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'password',
          database: 'bookshop',
        });
        sequelize.addModels([BooksAuthors, Books, Authors, Users]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];
