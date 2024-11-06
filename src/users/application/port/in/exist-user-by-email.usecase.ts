import { IsEmail, IsNotEmpty } from 'class-validator';
import { ValidationCommand } from '../../../../common/utils/validation-command';

export interface ExistUserByEmailUseCase {
  existUserByEmail(command: ExistUserByEmailCommand): Promise<boolean>;
}

export class ExistUserByEmailCommand extends ValidationCommand {
  @IsEmail({}, { message: 'The email is not valid' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  constructor(email: string) {
    super();
    this.email = email;
    this.validateSelf();
  }
}
