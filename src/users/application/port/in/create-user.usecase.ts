import { UserConfiguration } from '../../../domain/valueObjects/user-configuration';
import { UserStatus } from '../../../domain/enums/user-status';

export interface CreateUserUseCase {
  createUser(command: CreateUserCommand): Promise<string>;
}

// TODO: crear y agrer ValidationCommand
export class CreateUserCommand {
  name: string;
  lastname: string;
  email: string;
  password: string;
  profileImageUrl: string;
  userConfiguration: UserConfiguration;
  userStatus: UserStatus;

  constructor(
    name: string,
    lastname: string,
    email: string,
    password: string,
    profileImageUrl: string,
    userConfiguration: UserConfiguration,
    userStatus: UserStatus,
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.profileImageUrl = profileImageUrl;
    this.userConfiguration = userConfiguration;
    this.userStatus = userStatus;
  }
}
