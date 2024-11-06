import { Movie } from '../../../domain/entities/movie';

export interface MoviesPort {
  getMovies(): Promise<Partial<Movie>[]>;

  searchMovieBy(query: string): Promise<any[]>;

  getMovieById(id: string): Promise<Movie>;

  doesExistsByTitle(title: string): Promise<boolean>;

  save(movie: Movie): Promise<void>;

  update(movie: Movie): Promise<void>;

  delete(id: string): Promise<void>;
}
