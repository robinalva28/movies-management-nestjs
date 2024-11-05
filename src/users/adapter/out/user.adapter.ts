import { Injectable, Logger } from '@nestjs/common';
import { UserPort } from '../../application/port/out/user-port';
import { User } from '../../domain/entities/user';
import { UserEntity } from './persistence/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserAdapter implements UserPort {
  private readonly logger = new Logger(UserAdapter.name);

  constructor(
    @InjectModel(UserEntity.name)
    private readonly userSchema: Model<UserEntity>,
  ) {}

  async saveUser(user: User): Promise<void> {
    this.logger.debug('Creating user... ', user.email.toString());

    const newUser = new this.userSchema(this.mapToEntity(user));

    await newUser.save();

    this.logger.debug('User created successfully...', user.email.toString());
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
}
