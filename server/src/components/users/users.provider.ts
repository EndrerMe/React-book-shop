// Entitys
import { Users } from 'src/components/auth/auth.entity';

export const userProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];
