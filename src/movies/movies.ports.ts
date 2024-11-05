import { MoviesService } from './application/service/movies.service';

export const MoviesPorts = [
  //ports in
  { provide: 'GetAllMoviesUseCase', useClass: MoviesService },
  //ports out
];
