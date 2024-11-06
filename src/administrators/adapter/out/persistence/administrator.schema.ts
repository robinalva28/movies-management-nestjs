import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AdministratorStatus } from '../../../domain/administrator';
import { ObjectId, SchemaTypes } from 'mongoose';

@Schema({
  collection: 'administrators',
  versionKey: false,
  timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdate' },
})
export class AdministratorEntity {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ required: true, maxlength: 60 })
  name: string;

  @Prop({ required: true, maxlength: 60 })
  lastname: string;

  @Prop({ required: true, maxlength: 60 })
  email: string;

  @Prop({ required: true, maxlength: 120 })
  password: string;

  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;

  @Prop({
    type: String,
    required: true,
    enum: AdministratorStatus,
    default: AdministratorStatus.HA,
  })
  status: AdministratorStatus;

  @Prop({ type: SchemaTypes.Date })
  lastUpdate: Date;

  @Prop({ type: [String], default: ['ROLE_ADMINISTRATOR_FULL_ACCESS'] })
  roles: string[];

  @Prop({ type: [String], default: [] })
  additionalPermissions: string[];
}

export const AdministratorSchema =
  SchemaFactory.createForClass(AdministratorEntity);
