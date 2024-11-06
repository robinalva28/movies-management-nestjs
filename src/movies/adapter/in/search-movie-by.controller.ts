import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Logger,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  SearchMovieByCommand,
  SearchMovieByUseCase,
} from '../../application/port/in/search-movie-by.usecase';
import { UserAuthenticated } from '../../../common/auth/users-auth.decorator';
import { InternalServerErrorResponse } from '../../../common/exceptions/filters/internal-server-error-exception.filter';
import { ForbiddenResponse } from '../../../common/exceptions/filters/forbidden-exception.filter';
import { BadRequestResponse } from '../../../common/exceptions/filters/bad-request-exception.filter';
import { UnauthorizedResponse } from '../../../common/exceptions/filters/unauthorized-exception.filter';

@ApiBearerAuth()
@Controller('v1/movies')
@ApiTags('movies')
export class SearchMovieByController {
  private readonly logger = new Logger(SearchMovieByController.name);

  constructor(
    @Inject('SearchMovieByUseCase')
    private readonly searchMovieByUseCase: SearchMovieByUseCase,
  ) {}

  @Get('/search')
  @UserAuthenticated()
  @HttpCode(200)
  @ApiOperation({ summary: 'Search a movie by query' })
  @ApiQuery({ name: 'query', description: 'Query to search', required: true })
  @ApiForbiddenResponse({
    type: ForbiddenResponse
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
  })
  async searchMovieBy(@Query() { query }): Promise<any> {
    this.logger.debug('GET /v1/movies/search init...');
    const result = await this.searchMovieByUseCase.searchMovieBy(
      new SearchMovieByCommand(query),
    );

    this.logger.debug('GET /v1/movies/search done.');
    return result;
  }
}
