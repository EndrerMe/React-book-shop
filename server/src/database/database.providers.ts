// Vendors
import { Sequelize } from 'sequelize-typescript';

// Entitys
import { AuthorsInBookEntity, BookEntity, UserEntity, AuthorEntity } from '../core/entities/';

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
        sequelize.addModels([AuthorsInBookEntity, BookEntity, UserEntity, AuthorEntity]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];
