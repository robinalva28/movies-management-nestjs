import { MoviesPort } from '../../application/port/out/movies.port';
import { Injectable, Logger } from '@nestjs/common';
import { Movie } from '../../domain/entities/movie';
import { InjectModel } from '@nestjs/mongoose';
import { MoviesEntity } from './persistence/movies.schema';
import { Model, Promise } from 'mongoose';

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
        movieId: movie._id,
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

  async getMovieById(id: string): Promise<Movie> {
    const result = await this.moviesSchema.findOne({ _id: id }).exec();

    if (!result) {
      this.logger.debug('Movie not found on adapter.');
      return null;
    }

    return this.entityToDomain(result);
  }
  // al formatear, el linter me cambia las comillas dobles por simples, no formatear porque se rompe el aggregate
  // este metodo lo que hace es armar un aggregate para buscar las peliculas que contengan en su titulo o sinopsis las palabras de la query
  // para hacerlo más preciso, se divide la query en palabras de 3 o más caracteres y se busca que las palabras de la query estén contenidas en el titulo o sinopsis
  async searchMovieBy(query: string): Promise<any | []> {

    // remove accents from query exceptuando la ñ, que se mantiene
    const removeAccents = (str: string) => {
      // reemplazar temporalmente las ñ y Ñ con marcadores
      str = str.replace(/ñ/g, "__tildedaN__").replace(/Ñ/g, "__tildedA__");

      // normaliza la cadena y remueve los acentos
      str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // restaura los marcadores a ñ y Ñ
      str = str.replace(/__tildedaN__/g, "ñ").replace(/__tildedA__/g, "Ñ");

      return str;
    };

    const queryFormatted = removeAccents(query.toLowerCase());
    //obtengo las palabras de la consulta sin acentos, en minúsculas y de longitud mayor a 2(para evitar conectores y preposiciones)
    const words = queryFormatted.split(' ').filter((w) => w.length > 2);
    //splitear query cada 3 caracteres
    const querySplitted = words
      .map((w) => w.match(/.{1,3}/g))
      .flat()
      .filter((w) => w.length > 1);

    //Function to createAddFields Stage for aggregate
    const createAddFieldsStage = (querySplitted: string[]) => {
      return {
        $addFields: {
          score: {
            $sum: querySplitted.map((word) => ({
              $cond: {
                if: {
                  $or: [
                    {
                      $regexMatch: {
                        input: "$title",
                        regex: word,
                        options: "i",
                      },
                    },
                    {
                      $regexMatch: {
                        input: "$synopsis",
                        regex: word,
                        options: "i",
                      },
                    },
                  ],
                },
                then: {
                  $cond: {
                    if: {
                      $regexMatch: {
                        input: "$title",
                        regex: word,
                        options: "i",
                      },
                    },
                    then: 2,
                    else: 1,
                  },
                },
                else: 0,
              },
            })),
          },
        },
      };
    };

    const createMatchStage = () => {
      return {
        $match: {
          score: { $gt: 2 },
        },
      };
    };

    const createProjectStage = () => {
      return {
        $project: {
          score: 0,
        },
      };
    };

    const aggregatePipeline = () => {
      return [
        createAddFieldsStage(querySplitted),
        createMatchStage(),
        createProjectStage(),
        { $sort: { score: -1 as 1 | -1 } },
      ];
    };


    const movies = await this.moviesSchema
      .aggregate(aggregatePipeline())
      .exec();

    if (!movies) {
      this.logger.debug('Movies not found on adapter.');
      return [];
    }

    return movies;
  }

  private entityToDomain(movie: MoviesEntity): Movie {
    return {
      _id: movie._id,
      title: movie.title,
      episodeId: movie.episodeId,
      synopsis: movie.synopsis,
      director: movie.director,
      producer: movie.producer,
      releaseDate: movie.releaseDate,
      characters: movie.characters,
    };
  }

  async doesExistsByTitle(title: string): Promise<boolean> {
    const exists = await this.moviesSchema.exists({ title: title });

    return !!exists;
  }

  async save(movie: Movie): Promise<void> {
    const movieToSave = new this.moviesSchema({
      _id: movie._id,
      title: movie.title,
      episodeId: movie.episodeId,
      synopsis: movie.synopsis,
      director: movie.director,
      producer: movie.producer,
      releaseDate: movie.releaseDate,
      characters: movie.characters,
    });

    await movieToSave.save();
  }
}
