// Entitys
import { Book } from '../entities/';

export const bookProviders = [
  {
    provide: 'BookRepository',
    useValue: Book,
  },
];
