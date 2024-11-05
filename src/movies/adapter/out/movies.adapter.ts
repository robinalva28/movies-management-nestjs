import { MoviesPort } from '../../application/port/out/movies.port';
import { Injectable, Logger } from '@nestjs/common';
import { Movie } from '../../domain/entities/movie';
import { InjectModel } from '@nestjs/mongoose';
import { MoviesEntity } from './persistence/movies.schema';
import { Model } from 'mongoose';

@Injectable()
export class MoviesAdapter implements MoviesPort {
  private readonly logger = new Logger(MoviesAdapter.name);

  constructor(
    @InjectModel(MoviesEntity.name)
    private readonly moviesSchema: Model<MoviesEntity>,
  ) {}

  async getMovies(): Promise<Partial<Movie>[]> {
    const movies = await this.moviesSchema.find();

    if (!movies) {
      this.logger.debug('Movies not found on adapter.');
      return [];
    }

    this.logger.debug('Movies retrieved on adapter.');
    return movies.map((movie) => {
      return {
        movieId: movie.movieId,
        title: movie.title,
        episodeId: movie.episodeId,
        synopsis: movie.synopsis,
        director: movie.director,
        producer: movie.producer,
        releaseDate: movie.releaseDate,
        characters: movie.characters,
      };
    });
  }
}
