import { Controller, Delete, Inject, Logger, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse, ApiOperation,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  DeleteMovieCommand,
  DeleteMovieUseCase,
} from '../../application/port/in/delete-movie.usecase';
import { Permission } from '../../../administrators/common/roles/roles.decorator';
import { PermissionsEnum } from '../../../administrators/common/permissions/permissions.enum';
import { ForbiddenResponse } from '../../../common/exceptions/filters/forbidden-exception.filter';
import { InternalServerErrorResponse } from '../../../common/exceptions/filters/internal-server-error-exception.filter';
import { UnauthorizedResponse } from '../../../common/exceptions/filters/unauthorized-exception.filter';

@ApiBearerAuth()
@Controller('v1/movies')
@ApiTags('admin-movies')
export class DeleteMovieController {
  private readonly logger = new Logger(DeleteMovieController.name);

  constructor(
    @Inject('DeleteMovieUseCase')
    private readonly deleteMovieUseCase: DeleteMovieUseCase,
  ) {}

  @Delete(':id')
  @Permission(PermissionsEnum.MOVIES_DELETE)
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiNoContentResponse({ description: 'Movie deleted' })
  @ApiForbiddenResponse({
    type: ForbiddenResponse,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErrorResponse,
  })
  async deleteMovie(@Param('id') id: string) {
    this.logger.log(`Deleting movie with id: ${id}`);
    await this.deleteMovieUseCase.deleteMovie(new DeleteMovieCommand(id));
  }
}
