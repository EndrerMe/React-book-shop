// Vendors
import { Sequelize } from 'sequelize-typescript';

// Entitys
import { AuthorsAndBook, Book, User, Author } from '../core/entities';

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
        sequelize.addModels([AuthorsAndBook, Book, User, Author]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];
