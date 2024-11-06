import { MoviesService } from './application/service/movies.service';
import { MoviesAdapter } from './adapter/out/movies.adapter';
import { AdminMoviesService } from './application/service/admin-movies.service';

export const MoviesPorts = [
  //ports in
  { provide: 'GetAllMoviesUseCase', useClass: MoviesService },
  { provide: 'SearchMovieByUseCase', useClass: MoviesService },
  { provide: 'GetMovieByIdUseCase', useClass: MoviesService },
  { provide: 'CreateMovieUseCase', useClass: AdminMoviesService },
  //ports out
  { provide: 'MoviesPort', useClass: MoviesAdapter },
];
