import { Injectable, Logger } from '@nestjs/common';
import { UserPort } from '../../application/port/out/user-port';
import { User, UserBuilder } from '../../domain/entities/user';
import { UserEntity } from './persistence/user.schema';
import { Model, Promise } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserId } from '../../domain/valueObjects/user-id';
import { UserConfiguration } from '../../domain/valueObjects/user-configuration';

@Injectable()
export class UserAdapter implements UserPort {
  private readonly logger = new Logger(UserAdapter.name);

  constructor(
    @InjectModel(UserEntity.name)
    private readonly userSchema: Model<UserEntity>,
  ) {}

  async saveUser(user: User): Promise<void> {
    const newUser = new this.userSchema(this.mapToEntity(user));

    this.logger.debug('Saving user... ' + user.email.toString());
    await newUser.save();
  }

  async existsUserByEmail(email: string): Promise<boolean> {
    const result = await this.userSchema.exists({ email });

    return !!result;
  }

  async getUserByEmail(email: string): Promise<Partial<User>> {
    const user = await this.userSchema.findOne({ email }).exec();
    if (!user) {
      return null;
    }
    return this.mapToDomain(user);
  }

  private mapToEntity(user: User): Partial<UserEntity> {
    return {
      _id: user._id.value.toString(),
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      profileImageUrl: user.profileImageUrl,
      userConfiguration: user.userConfiguration,
      userStatus: user.userStatus,
    };
  }

  private mapToDomain(user: UserEntity): User {
    const userBuilder = new UserBuilder();
    const usrBuilt = userBuilder
      .withId(new UserId(user._id))
      .withName(user.name)
      .withLastname(user.lastname)
      .withEmail(user.email)
      .withPassword(user.password)
      .withProfileImageUrl(user.profileImageUrl)
      .withUserConfiguration(
        UserConfiguration.create(user.userConfiguration.screenMode),
      )
      .withUserStatus(user.userStatus);
    return usrBuilt.build();
  }
}
