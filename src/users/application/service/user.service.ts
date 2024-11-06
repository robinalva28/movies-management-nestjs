import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateUserCommand,
  CreateUserUseCase,
} from '../port/in/create-user.usecase';
import { UserPort } from '../port/out/user-port';
import { User, UserBuilder } from '../../domain/entities/user';
import { UserId } from '../../domain/valueObjects/user-id';
import * as bcrypt from 'bcrypt';
import { UserDomainService } from '../../domain/user.domain-service';
import {
  ExistUserByEmailCommand,
  ExistUserByEmailUseCase,
} from '../port/in/exist-user-by-email.usecase';
import { BusinessException } from '../../../common/exceptions/business.exception';

@Injectable()
export class UserService implements CreateUserUseCase, ExistUserByEmailUseCase {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('UserPort') private readonly userPort: UserPort,
    @Inject('UserDomainService')
    private readonly userDomainService: UserDomainService,
  ) {}

  async createUser(command: CreateUserCommand): Promise<string> {
    const doesExists = await this.existUserByEmail(
      new ExistUserByEmailCommand(command.email),
    );

    if (doesExists) {
      throw new BusinessException('User email already exists');
    }

    const userToSave = this.creationUserProcess(command);

    this.userDomainService.createUser(userToSave);

    await this.userPort.saveUser(userToSave);
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
      .build();
  }

  existUserByEmail(command: ExistUserByEmailCommand): Promise<boolean> {
    const { email } = command;

    this.logger.debug(`Checking if user exists by email: ${email}`);

    return this.userPort.existsUserByEmail(email);
  }
}
