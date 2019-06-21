// Entitys
import { Users } from 'src/components/auth/auth.entity';

export const authProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: Users,
  },
];
