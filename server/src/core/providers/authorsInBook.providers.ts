// Entitys
import { AuthorsAndBook } from '../entities/';

export const booksAuthorsProviders = [
  {
    provide: 'AuthorsInBookRepository',
    useValue: AuthorsAndBook,
  },
];
