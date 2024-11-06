import { ValidationCommand } from '../../../../common/utils/validation-command';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export interface CreateMovieUseCase {
  createMovie(command: CreateMovieCommand): Promise<void>;
}

export class CreateMovieCommand extends ValidationCommand {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title is required.' })
  @MaxLength(100, { message: 'Title must be less than 100 characters.' })
  title: string;
  @IsString({ message: 'EpisodeId must be a string.' })
  @IsNotEmpty({ message: 'EpisodeId is required.' })
  @MaxLength(10, { message: 'EpisodeId must be less than 10 characters.' })
  episodeId: string;
  @IsString({ message: 'Synopsis must be a string.' })
  @IsNotEmpty({ message: 'Synopsis is required.' })
  @MaxLength(255, { message: 'Synopsis must be less than 255 characters.' })
  synopsis: string;
  @IsString({ message: 'Director must be a string.' })
  @IsNotEmpty({ message: 'Director is required.' })
  @MaxLength(64, { message: 'Director must be less than 64 characters.' })
  director: string;
  @IsString({ message: 'Producer must be a string.' })
  @IsNotEmpty({ message: 'Producer is required.' })
  @MaxLength(128, { message: 'Producer must be less than 128 characters.' })
  producer: string;
  @IsNotEmpty({ message: 'ReleaseDate is required.' })
  releaseDate: Date;
  @IsString({ message: 'Characters must be a string.' })
  @IsNotEmpty({ message: 'Characters is required.' })
  @MaxLength(512, { message: 'Characters must be less than 512 characters.' })
  characters: string;

  constructor(
    title: string,
    episodeId: string,
    synopsis: string,
    director: string,
    producer: string,
    releaseDate: Date,
    characters: string,
  ) {
    super();
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
