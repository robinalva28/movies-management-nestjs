import { IsNotEmpty, IsString } from 'class-validator';
import { ValidationCommand } from '../../../../common/utils/validation-command';

export interface GetMovieByIdUseCase {
  getMovieById(command: GetMovieByIdCommand): Promise<any>;
}

export class GetMovieByIdCommand extends ValidationCommand {
  @IsString({ message: 'Id must be a string' })
  @IsNotEmpty({ message: 'Id is required' })
  id: string;

  constructor(id: string) {
    super();
    this.id = id;
    this.validateSelf();
  }
}
