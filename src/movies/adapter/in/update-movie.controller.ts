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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  UpdateMovieCommand,
  UpdateMovieUseCase,
} from '../../application/port/in/update-movie.usecase';
import { UpdateMovieBody } from './body/update-movie.body';

@Controller('v1/movies')
@ApiTags('admin-movies')
export class UpdateMovieController {
  private readonly logger = new Logger(UpdateMovieController.name);

  constructor(
    @Inject('UpdateMovieUseCase')
    private readonly updateMovieUseCase: UpdateMovieUseCase,
  ) {}

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Movie updated successfully' })
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
