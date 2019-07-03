// Entitys
import { BookEntity } from '../entities/';

export const bookProviders = {
  provide: 'BookRepository',
  useValue: BookEntity,
}

