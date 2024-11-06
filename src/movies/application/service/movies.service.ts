import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetAllMoviesUseCase } from '../port/in/get-all-movies.usecase';
import { MoviesPort } from '../port/out/movies.port';
import { NotFoundException } from '../../../common/exceptions/not-found.exception';
import {
  SearchMovieByCommand,
  SearchMovieByUseCase,
} from '../port/in/search-movie-by.usecase';
import {
  GetMovieByIdCommand,
  GetMovieByIdUseCase,
} from '../port/in/get-movie-by-id.usecase';

@Injectable()
export class MoviesService
  implements GetAllMoviesUseCase, SearchMovieByUseCase, GetMovieByIdUseCase
{
  private readonly logger = new Logger(MoviesService.name);

  constructor(@Inject('MoviesPort') private readonly moviesPort: MoviesPort) {}

  async getMovies() {
    this.logger.debug('Getting all movies...');
    const moviesFromDb = await this.moviesPort.getMovies();

    if (!moviesFromDb || moviesFromDb.length === 0) {
      throw new NotFoundException('Movies not found.');
    }

    this.logger.debug('Movies retrieved on service.');
    return moviesFromDb;
  }

  async searchMovieBy(command: SearchMovieByCommand): Promise<any> {
    this.logger.debug(`Searching movie by query: ${command.query}`);
    const movieFromDb = await this.moviesPort.searchMovieBy(command.query);

    this.logger.debug('Movie retrieved on service.');
    return movieFromDb;
  }

  async getMovieById(command: GetMovieByIdCommand): Promise<any> {
    this.logger.debug(`Getting movie by id: ${command.id}`);
    const movie = await this.moviesPort.getMovieById(command.id);

    if (!movie) {
      throw new NotFoundException('Movie not found.');
    }

    this.logger.debug('Movie retrieved on service.');
    return movie;
  }
}
