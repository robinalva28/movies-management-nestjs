import { UserConfiguration } from '../../../domain/valueObjects/user-configuration';
import { UserStatus } from '../../../domain/enums/user-status';

export class CreateUserBody {
  name: string;
  email: string;
  lastname: string;
  password: string;
  profileImageUrl: string;
  userConfiguration: UserConfiguration;
  userStatus: UserStatus;
}
