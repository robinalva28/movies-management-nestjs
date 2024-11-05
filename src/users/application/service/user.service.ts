import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateUserCommand,
  CreateUserUseCase,
} from '../port/in/create-user.usecase';
import { UserPort } from '../port/out/user-port';
import { User, UserBuilder } from '../../domain/entities/user';
import { UserId } from '../../domain/valueObjects/user-id';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements CreateUserUseCase {
  private readonly logger = new Logger(UserService.name);

  constructor(@Inject('UserPort') private readonly userPort: UserPort) {}

  async createUser(command: CreateUserCommand): Promise<string> {
    //todo: validar si existe el usuario by email
    const user = this.creationUserProcess(command);
    await this.userPort.saveUser(user);
    return `token`;
  }

  private creationUserProcess(command: CreateUserCommand): User {
    const userBuilder = new UserBuilder();
    const salt = bcrypt.genSaltSync(10);
    const passwHashed = bcrypt.hashSync(command.password, salt);

    return userBuilder
      .withId(UserId.generate())
      .withName(command.name)
      .withLastname(command.lastname)
      .withEmail(command.email)
      .withPassword(passwHashed)
      .withProfileImageUrl(command.profileImageUrl)
      .withUserConfiguration(command.userConfiguration)
      .withUserStatus(command.userStatus)
      .build();
  }
}
