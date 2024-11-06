import { Movie } from '../../../domain/entities/movie';

export interface MoviesPort {
  getMovies(): Promise<Partial<Movie>[]>;

  searchMovieBy(query: string): Promise<any[]>;

  getMovieById(id: string): Promise<Movie>;
}
