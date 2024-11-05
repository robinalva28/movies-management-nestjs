import { Controller, Get, HttpCode, Inject, Logger } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetAllMoviesUseCase } from '../../application/port/in/get-all-movies.usecase';
import { NotFoundResponse } from '../../../common/exceptions/filters/not-found-exception.filter';

@Controller('v1/movies')
@ApiTags('movies')
export class GetAllMoviesController {
  private readonly logger = new Logger(GetAllMoviesController.name);

  constructor(
    @Inject('GetAllMoviesUseCase')
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Movies were successfully retrieved',
  })
  @HttpCode(200)
  @ApiNotFoundResponse({
    type: NotFoundResponse,
  })
  async getAllMovies() {
    this.logger.debug('GET /v1/movies init...');
    const result = await this.getAllMoviesUseCase.getMovies();

    this.logger.debug('GET /v1/movies done.');
    return result;
  }
}
