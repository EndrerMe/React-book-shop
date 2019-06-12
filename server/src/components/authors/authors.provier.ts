// Entitys
import { Authors } from "./authors.entity";

export const authorsProviders = [
  {
    provide: 'AUTHORS_REPOSITORY',
    useValue: Authors,
  },
];