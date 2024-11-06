import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMovieBody } from './body/create-movie.body';
import {
  CreateMovieCommand,
  CreateMovieUseCase,
} from '../../application/port/in/create-movie.usecase';
import { ConflictResponse } from '../../../common/exceptions/filters/conflict-exception.filter';
import { InternalServerErrorResponse } from '../../../common/exceptions/filters/internal-server-error-exception.filter';
import { BadRequestResponse } from '../../../common/exceptions/filters/bad-request-exception.filter';
import { Permission } from '../../../administrators/common/roles/roles.decorator';
import { PermissionsEnum } from '../../../administrators/common/permissions/permissions.enum';

@ApiBearerAuth()
@Controller('v1/movies')
@ApiTags('admin-movies')
export class CreateMovieController {
  private readonly logger = new Logger(CreateMovieController.name);

  constructor(
    @Inject('CreateMovieUseCase')
    private readonly createMovieUseCase: CreateMovieUseCase,
  ) {}

  @Post('/')
  @Permission(PermissionsEnum.MOVIES_CREATE)
  @ApiOperation({ summary: 'Create a movie' })
  @ApiOkResponse({ description: 'Movie created successfully' })
  @ApiConflictResponse({ type: ConflictResponse })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  async createMovie(@Body() body: CreateMovieBody) {
    this.logger.debug(`Creating movie... ${body.title}`);
    return await this.createMovieUseCase.createMovie(
      new CreateMovieCommand(
        body.title,
        body.episodeId,
        body.synopsis,
        body.director,
        body.producer,
        body.releaseDate,
        body.characters,
      ),
    );
  }
}
