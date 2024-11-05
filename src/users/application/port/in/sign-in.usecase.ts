import { ValidationCommand } from '../../../../common/utils/validation-command';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { TokenView } from '../../../adapter/in/view/token.view';

export interface SignInUseCase {
  signIn(command: SignInCommand): Promise<TokenView>;
}

export class SignInCommand extends ValidationCommand {
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
    this.validateSelf();
  }
}
