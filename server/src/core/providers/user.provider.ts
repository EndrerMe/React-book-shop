// Entities
import { User } from '../entities';

export const userProviders =  [
  {
    provide: 'UserRepository',
    useValue: User,
  },
];
