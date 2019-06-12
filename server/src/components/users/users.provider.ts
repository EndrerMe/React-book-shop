// Entitys
import { Users } from "../auth/auth.entity";

export const userProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
];