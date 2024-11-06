import { Movie } from '../../../domain/entities/movie';
import { ValidationCommand } from '../../../../common/utils/validation-command';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export interface UpdateMovieUseCase {
  updateMovie(command: UpdateMovieCommand): Promise<Movie>;
}

export class UpdateMovieCommand extends ValidationCommand {
  @IsNotEmpty({ message: 'The id is required' })
  id: string;

  @IsString({ message: 'The title must be a string' })
  @MaxLength(100, { message: 'Title must be less than 100 characters.' })
  @IsOptional()
  title?: string;

  @IsString({ message: 'EpisodeId must be a string.' })
  @MaxLength(10, { message: 'EpisodeId must be less than 10 characters.' })
  @IsOptional()
  episodeId?: string;

  @IsString({ message: 'Synopsis must be a string.' })
  @MaxLength(255, { message: 'Synopsis must be less than 255 characters.' })
  @IsOptional()
  synopsis?: string;

  @IsString({ message: 'Director must be a string.' })
  @MaxLength(64, { message: 'Director must be less than 64 characters.' })
  @IsOptional()
  director?: string;

  @IsString({ message: 'Producer must be a string.' })
  @MaxLength(128, { message: 'Producer must be less than 128 characters.' })
  @IsOptional()
  producer?: string;

  @IsOptional()
  releaseDate?: Date;

  @IsString({ message: 'Characters must be a string.' })
  @MaxLength(512, { message: 'Characters must be less than 512 characters.' })
  @IsOptional()
  characters?: string;

  constructor(
    id: string,
    title?: string,
    episodeId?: string,
    synopsis?: string,
    director?: string,
    producer?: string,
    releaseDate?: Date,
    characters?: string,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.episodeId = episodeId;
    this.synopsis = synopsis;
    this.director = director;
    this.producer = producer;
    this.releaseDate = releaseDate;
    this.characters = characters;
    this.validateSelf();
  }
}
