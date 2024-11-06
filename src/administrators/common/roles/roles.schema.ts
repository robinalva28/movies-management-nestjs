import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, SchemaTypes } from 'mongoose';

@Schema({ collection: 'roles', versionKey: false, timestamps: false })
export class RolesEntity {
  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: ObjectId;

  @Prop({ required: true, maxlength: 60 })
  roleName: string;

  @Prop({ required: true, type: [String] })
  permissions: string[];
}

export const RolesSchema = SchemaFactory.createForClass(RolesEntity);
