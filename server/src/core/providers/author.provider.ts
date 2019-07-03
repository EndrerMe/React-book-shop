// Entities
import { AuthorEntity } from "../entities/";

export const authorProviders = {
  provide: 'AuthorRepository',
  useValue: AuthorEntity,
}
