import { User } from './entities';

export const usersProviders = [{ provide: 'UsersRepository', useValue: User }];
