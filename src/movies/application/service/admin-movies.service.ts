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

@Injectable()
export class AdminMoviesService
  implements CreateMovieUseCase, ExistsMovieByTitleUseCase
{
  private readonly logger = new Logger(AdminMoviesService.name);

  constructor(
    @Inject('MoviesPort')
    private readonly moviesPort: MoviesAdapter
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
}
