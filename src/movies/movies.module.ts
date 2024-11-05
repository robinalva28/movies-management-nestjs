import { Module } from '@nestjs/common';
import { GetAllMoviesController } from './adapter/in/get-all-movies.controller';
import { MoviesPorts } from './movies.ports';

@Module({
  imports: [],
  controllers: [GetAllMoviesController],
  providers: [...MoviesPorts],
})
export class MoviesModule {}
