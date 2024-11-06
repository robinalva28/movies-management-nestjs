import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  GetMovieByIdCommand,
  GetMovieByIdUseCase,
} from '../../application/port/in/get-movie-by-id.usecase';
import { NotFoundResponse } from 'src/common/exceptions/filters/not-found-exception.filter';
import { UserAuthenticated } from '../../../common/auth/users-auth.decorator';

@ApiBearerAuth()
@Controller('v1/movies')
@ApiTags('movies')
export class GetMovieByIdController {
  private readonly logger = new Logger(GetMovieByIdController.name);

  constructor(
    @Inject('GetMovieByIdUseCase')
    private readonly getMovieByIdUseCase: GetMovieByIdUseCase,
  ) {}

  @Get(':id')
  @UserAuthenticated()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Movie found' })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  async getMovieById(@Param('id') id: string) {
    this.logger.debug(`Getting movie by id ${id}`);
    return await this.getMovieByIdUseCase.getMovieById(
      new GetMovieByIdCommand(id),
    );
  }
}
