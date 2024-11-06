import { ValidationCommand } from '../../../../common/utils/validation-command';
import { IsNotEmpty, IsString } from 'class-validator';

export interface ExistsMovieByTitleUseCase {
  doesExistsByTitle(command: ExistsMovieByTitleCommand): Promise<any>;
}

export class ExistsMovieByTitleCommand extends ValidationCommand {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  constructor(title: string) {
    super();
    this.title = title;
    this.validateSelf();
  }
}
