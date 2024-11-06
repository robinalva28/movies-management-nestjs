import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  collection: 'movies',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false,
})
export class MoviesEntity {
  @Prop({ type: String, required: true, auto: false })
  _id: string;
  @Prop({ type: String, required: false })
  title: string;
  @Prop({ type: String, required: false })
  episodeId: string;
  @Prop({ type: String, required: false })
  synopsis: string;
  @Prop({ type: String, required: false })
  director: string;
  @Prop({ type: String, required: false })
  producer: string;
  @Prop({ type: Date, required: false })
  releaseDate: Date;
  @Prop({ type: String, required: false })
  characters: string;
  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;
  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;
}

export const MoviesSchema = SchemaFactory.createForClass(MoviesEntity);
