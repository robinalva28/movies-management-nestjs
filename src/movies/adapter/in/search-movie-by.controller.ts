import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Logger,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import {
  SearchMovieByCommand,
  SearchMovieByUseCase,
} from '../../application/port/in/search-movie-by.usecase';

@Controller('v1/movies')
export class SearchMovieByController {
  private readonly logger = new Logger(SearchMovieByController.name);

  constructor(
    @Inject('SearchMovieByUseCase')
    private readonly searchMovieByUseCase: SearchMovieByUseCase,
  ) {}

  @Get('/search')
  @HttpCode(200)
  @ApiOperation({ summary: 'Search a movie by query' })
  @ApiQuery({ name: 'query', description: 'Query to search', required: true })
  async searchMovieBy(@Query() { query }): Promise<any> {
    this.logger.debug('GET /v1/movies/search init...');
    const result = await this.searchMovieByUseCase.searchMovieBy(
      new SearchMovieByCommand(query),
    );

    this.logger.debug('GET /v1/movies/search done.');
    return result;
  }
}
