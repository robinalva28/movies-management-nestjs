import { User } from '../../../domain/entities/user';

export interface UserPort {
  saveUser(user: Partial<User>): Promise<void>;
  existsUserByEmail(email: string): Promise<boolean>;
}
