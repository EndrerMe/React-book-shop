// Entitys
import { AuthorsInBookEntity } from '../entities/';

export const booksAuthorsProviders =   {
  provide: 'AuthorsInBookRepository',
  useValue: AuthorsInBookEntity,
}
