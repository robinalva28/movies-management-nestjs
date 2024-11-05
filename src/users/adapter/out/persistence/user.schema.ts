import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { UserConfiguration } from '../../../domain/valueObjects/user-configuration';
import { UserStatus } from '../../../domain/enums/user-status';

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false,
})
export class UserEntity {
  @Prop({ type: String, required: true, auto: false })
  _id: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  lastname: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true })
  profileImageUrl: string;
  @Prop({ type: Object, required: true })
  userConfiguration: UserConfiguration;
  @Prop({ type: String, required: true })
  userStatus: UserStatus;
  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;
  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
