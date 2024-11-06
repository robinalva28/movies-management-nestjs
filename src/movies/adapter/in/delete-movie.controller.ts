import { Controller, Delete, Inject, Logger, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import {
  DeleteMovieCommand,
  DeleteMovieUseCase,
} from '../../application/port/in/delete-movie.usecase';
import { Permission } from '../../../administrators/common/roles/roles.decorator';
import { PermissionsEnum } from '../../../administrators/common/permissions/permissions.enum';

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
  @ApiNoContentResponse({ description: 'Movie deleted' })
  async deleteMovie(@Param('id') id: string) {
    this.logger.log(`Deleting movie with id: ${id}`);
    await this.deleteMovieUseCase.deleteMovie(new DeleteMovieCommand(id));
  }
}
