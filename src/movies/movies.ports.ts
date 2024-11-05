import { MoviesService } from './application/service/movies.service';
import { MoviesAdapter } from './adapter/out/movies.adapter';

export const MoviesPorts = [
  //ports in
  { provide: 'GetAllMoviesUseCase', useClass: MoviesService },
  //ports out
  { provide: 'MoviesPort', useClass: MoviesAdapter },
];
