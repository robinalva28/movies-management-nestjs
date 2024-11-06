import { ValidationCommand } from '../../../../common/utils/validation-command';
import { IsNotEmpty, IsString } from 'class-validator';

export interface DeleteMovieUseCase {
  deleteMovie(command: DeleteMovieCommand): Promise<void>;
}

export class DeleteMovieCommand extends ValidationCommand {
  @IsString({ message: 'The id must be a string' })
  @IsNotEmpty({ message: 'The id is required' })
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
    this.validateSelf();
  }
}
