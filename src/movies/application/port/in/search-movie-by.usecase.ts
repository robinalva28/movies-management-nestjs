import { ValidationCommand } from '../../../../common/utils/validation-command';
import { IsNotEmpty, IsString } from 'class-validator';

export interface SearchMovieByUseCase {
  searchMovieBy(command: SearchMovieByCommand): Promise<any>;
}

export class SearchMovieByCommand extends ValidationCommand {
  @IsString({ message: 'Query must be a string' })
  @IsNotEmpty({ message: 'Query is required' })
  query: string;

  constructor(query: string) {
    super();
    this.query = query;
    this.validateSelf();
  }
}
