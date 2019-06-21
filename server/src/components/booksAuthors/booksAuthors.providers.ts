// Entitys
import { BooksAuthors } from 'src/components/booksAuthors/booksAuthors.entity';

export const booksAuthorsProviders = [
  {
    provide: 'BooksAuthors_REPOSITORY',
    useValue: BooksAuthors,
  },
];
