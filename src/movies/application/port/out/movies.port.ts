import { Movie } from '../../../domain/entities/movie';

export interface MoviesPort {
  getMovies(): Promise<Partial<Movie>[]>;
}
