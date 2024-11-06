import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  UpdateMovieCommand,
  UpdateMovieUseCase,
} from '../../application/port/in/update-movie.usecase';
import { UpdateMovieBody } from './body/update-movie.body';
import { Permission } from '../../../administrators/common/roles/roles.decorator';
import { PermissionsEnum } from '../../../administrators/common/permissions/permissions.enum';
import { ForbiddenResponse } from '../../../common/exceptions/filters/forbidden-exception.filter';
import { BadRequestResponse } from '../../../common/exceptions/filters/bad-request-exception.filter';
import { InternalServerErrorResponse } from '../../../common/exceptions/filters/internal-server-error-exception.filter';
import { UnauthorizedResponse } from '../../../common/exceptions/filters/unauthorized-exception.filter';

@ApiBearerAuth()
@Controller('v1/movies')
@ApiTags('admin-movies')
export class UpdateMovieController {
  private readonly logger = new Logger(UpdateMovieController.name);

  constructor(
    @Inject('UpdateMovieUseCase')
    private readonly updateMovieUseCase: UpdateMovieUseCase,
  ) {}

  @Patch('/:id')
  @Permission(PermissionsEnum.MOVIES_UPDATE)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Movie updated successfully' })
  @ApiOperation({ summary: 'Update a movie' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
  })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
  })
  async updateMovie(@Param('id') id: string, @Body() body: UpdateMovieBody) {
    this.logger.debug(`Updating movie... ${id}`);
    return await this.updateMovieUseCase.updateMovie(
      new UpdateMovieCommand(
        id,
        body?.title,
        body?.episodeId,
        body?.synopsis,
        body?.director,
        body?.producer,
        body?.releaseDate,
        body?.characters,
      ),
    );
  }
}
