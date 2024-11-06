import { Controller, Delete, Inject, Logger, Param } from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import {
  DeleteMovieCommand,
  DeleteMovieUseCase,
} from '../../application/port/in/delete-movie.usecase';

@Controller('v1/movies')
@ApiTags('admin-movies')
export class DeleteMovieController {
  private readonly logger = new Logger(DeleteMovieController.name);

  constructor(
    @Inject('DeleteMovieUseCase')
    private readonly deleteMovieUseCase: DeleteMovieUseCase,
  ) {}

  @Delete(':id')
  @ApiNoContentResponse({ description: 'Movie deleted' })
  async deleteMovie(@Param('id') id: string) {
    this.logger.log(`Deleting movie with id: ${id}`);
    await this.deleteMovieUseCase.deleteMovie(new DeleteMovieCommand(id));
  }
}
