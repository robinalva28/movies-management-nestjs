import {
  CreateMovieCommand,
  CreateMovieUseCase,
} from '../port/in/create-movie.usecase';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { Movie } from '../../domain/entities/movie';
import {
  ExistsMovieByTitleCommand,
  ExistsMovieByTitleUseCase,
} from '../port/in/exists-movie-by-title-use.case';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { MoviesAdapter } from '../../adapter/out/movies.adapter';
import { InternalServerErrorException } from '../../../common/exceptions/internal-server-error.exception';
import {
  UpdateMovieCommand,
  UpdateMovieUseCase,
} from '../port/in/update-movie.usecase';
import {
  DeleteMovieCommand,
  DeleteMovieUseCase,
} from '../port/in/delete-movie.usecase';

@Injectable()
export class AdminMoviesService
  implements
    CreateMovieUseCase,
    ExistsMovieByTitleUseCase,
    UpdateMovieUseCase,
    DeleteMovieUseCase
{
  private readonly logger = new Logger(AdminMoviesService.name);

  constructor(
    @Inject('MoviesPort')
    private readonly moviesPort: MoviesAdapter,
  ) {}

  async createMovie(command: CreateMovieCommand): Promise<void> {
    //check if the movie already exists by title
    const movieExists = await this.doesExistsByTitle(
      new ExistsMovieByTitleCommand(command.title),
    );

    if (movieExists) {
      throw new BusinessException('Movie already exists.');
    }

    const {
      title,
      episodeId,
      synopsis,
      director,
      producer,
      releaseDate,
      characters,
    } = command;

    const movieToSave: Movie = {
      _id: uuid4(),
      title,
      episodeId,
      synopsis,
      director,
      producer,
      releaseDate,
      characters,
    };

    this.logger.debug('Creating movie...');
    try {
      await this.moviesPort.save(movieToSave);
    } catch (error) {
      throw new InternalServerErrorException('Error creating movie.' + error);
    }

    this.logger.debug('Movie created on service.');
  }

  async doesExistsByTitle(
    command: ExistsMovieByTitleCommand,
  ): Promise<boolean> {
    const { title } = command;

    this.logger.debug(`Checking if the movie exists by title: ${title}`);
    const movieExists = await this.moviesPort.doesExistsByTitle(title);

    this.logger.debug('Movie retrieved on service.');
    return movieExists;
  }

  async updateMovie({
    id,
    title = undefined,
    episodeId = undefined,
    synopsis = undefined,
    director = undefined,
    producer = undefined,
    releaseDate = undefined,
    characters = undefined,
  }: UpdateMovieCommand): Promise<Movie> {
    const movie = await this.moviesPort.getMovieById(id);

    if (!movie) {
      throw new BusinessException('Movie not found.');
    }

    //validate if all the values from command are null except the id
    if (
      !title &&
      !episodeId &&
      !synopsis &&
      !director &&
      !producer &&
      !releaseDate &&
      !characters
    ) {
      throw new BusinessException('No values to update.');
    }

    //validate if the movie already exists by title
    if (title && title !== movie.title) {
      const movieExists = await this.doesExistsByTitle(
        new ExistsMovieByTitleCommand(title),
      );

      if (movieExists) {
        throw new BusinessException('Movie title already exists.');
      }
    }

    const movieToUpdate: Movie = {
      _id: id,
      title: title ? title : movie.title,
      episodeId: episodeId ? episodeId : movie.episodeId,
      synopsis: synopsis ? synopsis : movie.synopsis,
      director: director ? director : movie.director,
      producer: producer ? producer : movie.producer,
      releaseDate: releaseDate ? releaseDate : movie.releaseDate,
      characters: characters ? characters : movie.characters,
    };

    this.logger.debug('Updating movie...');
    try {
      await this.moviesPort.update(movieToUpdate);
    } catch (error) {
      throw new InternalServerErrorException('Error updating movie.' + error);
    }

    this.logger.debug('Movie updated on service.');
    return movieToUpdate;
  }

  async deleteMovie(command: DeleteMovieCommand): Promise<void> {
    await this.moviesPort.delete(command.id);
  }
}
