import { Sequelize } from 'sequelize-typescript';
import { BooksAuthors } from 'src/components/booksAuthors/booksAuthors.entity';
import { Books } from 'src/components/books/books.entity';
import { Authors } from 'src/components/authors/authors.entity';
import { Users } from 'src/components/auth/auth.entity';

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
