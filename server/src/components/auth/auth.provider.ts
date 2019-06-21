// Entitys
import { Users } from './auth.entity';

export const authProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: Users,
  },
];
