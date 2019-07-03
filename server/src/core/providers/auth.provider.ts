// Entities
import { UserEntity } from '../entities/';

export const authProviders = {
  provide: 'AuthRepository',
  useValue: UserEntity,
}
  
