import { User } from './entities/user';

export interface UserDomainService {
  createUser(user: User): void;
}
