import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({
  collection: 'movies',
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  versionKey: false,
})
export class MoviesEntity {
  @Prop({ type: String, required: true, auto: false })
  movieId: string;
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  episodeId: string;
  @Prop({ type: String, required: true })
  synopsis: string;
  @Prop({ type: String, required: true })
  director: string;
  @Prop({ type: String, required: true })
  producer: string;
  @Prop({ type: Date })
  releaseDate: Date;
  @Prop({ type: String, required: true })
  characters: string;
  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;
  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;
}

export const MoviesSchema = SchemaFactory.createForClass(MoviesEntity);
