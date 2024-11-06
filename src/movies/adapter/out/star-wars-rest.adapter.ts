import { StarWarsPort } from '../../application/port/out/star-wars.port';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Movie } from '../../domain/entities/movie';

@Injectable()
export class StarWarsRestAdapter implements StarWarsPort {
  private readonly logger = new Logger(StarWarsRestAdapter.name);

  constructor() {}

  async getStarWars(): Promise<any> {
    try {
      const response = await axios.get('https://swapi.dev/api/films/');
      const films = response.data.results;
      const mappedFilms = await Promise.all(films.map(mapStarWarsToMyMovie));
      return mappedFilms;
    } catch (error) {
      this.logger.error('Error fetching Star Wars data', error);
      throw new Error('Failed to fetch Star Wars data');
    }
  }
}

async function mapStarWarsToMyMovie(apiResponse: any): Promise<Partial<Movie>> {
  const charactersNames = await Promise.all(
    apiResponse.characters.map(async (url: string) => {
      const response = await axios.get(url);
      return response.data.name;
    }),
  );

  return {
    title: apiResponse.title,
    episodeId: apiResponse.episode_id,
    synopsis: apiResponse.opening_crawl,
    director: apiResponse.director,
    producer: apiResponse.producer,
    releaseDate: new Date(apiResponse.release_date),
    characters: charactersNames.join(', '),
  };
}
