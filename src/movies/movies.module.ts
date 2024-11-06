import { Module } from '@nestjs/common';
import { GetAllMoviesController } from './adapter/in/get-all-movies.controller';
import { MoviesPorts } from './movies.ports';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MoviesEntity,
  MoviesSchema,
} from './adapter/out/persistence/movies.schema';
import { ConfigModule } from '@nestjs/config';
import { MoviesInitService } from './application/service/movies-init.service';
import { SearchMovieByController } from './adapter/in/search-movie-by.controller';
import { GetMovieByIdController } from './adapter/in/get-movie-by-id.controller';
import { CreateMovieController } from './adapter/in/create-movie.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MoviesEntity.name, schema: MoviesSchema },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [
    GetAllMoviesController,
    SearchMovieByController,
    GetMovieByIdController,
    CreateMovieController,
  ],
  providers: [...MoviesPorts, MoviesInitService],
  exports: [MongooseModule],
})
export class MoviesModule {}
