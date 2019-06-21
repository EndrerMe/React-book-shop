// Entitys
import { Books } from 'src/components/books/books.entity';

export const booksProviders = [
  {
    provide: 'BOOKS_REPOSITORY',
    useValue: Books,
  },
];
