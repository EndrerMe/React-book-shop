// Entities
import { User } from '../entities/';

export const authProviders = [
  {
    provide: 'AuthRepository',
    useValue: User,
  },
];
