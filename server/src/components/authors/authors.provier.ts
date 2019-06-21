// Entitys
import { Authors } from 'src/components/authors/authors.entity';

export const authorsProviders = [
  {
    provide: 'AUTHORS_REPOSITORY',
    useValue: Authors,
  },
];
