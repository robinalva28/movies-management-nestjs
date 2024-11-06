import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidationCommand } from '../../../../common/utils/validation-command';
import { TokenView } from '../../../adapter/in/view/token.view';

export interface AuthAdministratorUseCase {
  signIn(command: AuthAdministratorCommand): Promise<TokenView>;
}

export class AuthAdministratorCommand extends ValidationCommand {
  @IsEmail({}, { message: 'The email is invalid' })
  @MaxLength(60, {
    message: 'The email exceed the maximum length, 60 characters',
  })
  @IsNotEmpty({ message: 'The email is required' })
  @IsString({ message: 'The email must be a string' })
  email: string;

  @MinLength(8, { message: 'The password is too short, minimum 8 characters' })
  @MaxLength(12, {
    message: 'The password is too large, maximum 12 characters',
  })
  @IsNotEmpty({ message: 'The password is required' })
  @IsString({ message: 'The password must be a string' })
  password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
    this.validateSelf();
  }
}
