import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetAllMoviesUseCase } from '../port/in/get-all-movies.usecase';
import { MoviesPort } from '../port/out/movies.port';
import { NotFoundException } from '../../../common/exceptions/not-found.exception';

@Injectable()
export class MoviesService implements GetAllMoviesUseCase {
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
}
