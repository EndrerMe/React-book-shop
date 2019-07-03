// Entities
import { UserEntity } from '../entities';

export const userProviders =  {
  provide: 'AserRepository',
  useValue: UserEntity,
}
