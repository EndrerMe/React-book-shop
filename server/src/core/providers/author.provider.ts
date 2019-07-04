// Entities
import { Author } from '../entities/';

export const authorProviders = [
  {
    provide: 'AuthorRepository',
    useValue: Author,
  },
];
