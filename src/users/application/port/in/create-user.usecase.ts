import { ValidationCommand } from '../../../../common/utils/validation-command';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export interface CreateUserUseCase {
  createUser(command: CreateUserCommand): Promise<string>;
}

export class CreateUserCommand extends ValidationCommand {
  @IsString({ message: 'Name must be a string' })
  name: string;
  @IsString({ message: 'Name must be a string' })
  lastname: string;
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
  @IsString({ message: 'Profile image url must be a string' })
  @IsOptional()
  profileImageUrl: string;

  constructor(
    name: string,
    lastname: string,
    email: string,
    password: string,
    profileImageUrl: string,
  ) {
    super();
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.profileImageUrl = profileImageUrl;
    this.validateSelf();
  }
}
