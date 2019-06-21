// Entitys
import { BooksAuthors } from './booksAuthors.entity';

export const booksAuthorsProviders = [
  {
    provide: 'BooksAuthors_REPOSITORY',
    useValue: BooksAuthors,
  },
];
