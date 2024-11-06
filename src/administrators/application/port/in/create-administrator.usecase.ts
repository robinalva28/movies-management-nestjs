import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';
import { ValidationCommand } from '../../../../common/utils/validation-command';

export interface CreateAdministratorUseCase {
  createAdministrator(command: CreateAdministratorCommand): Promise<void>;
}

export class CreateAdministratorCommand extends ValidationCommand {
  @MaxLength(60, { message: 'The name exceeds the maximum length possible' })
  @IsNotEmpty({ message: 'The name is required' })
  name: string;

  @MaxLength(60, {
    message: 'The lastname exceeds the maximum length possible',
  })
  @IsNotEmpty({ message: 'The lastname is required' })
  lastname: string;

  @IsEmail({}, { message: 'Invalid email' })
  @MaxLength(60, { message: 'The email exceeds the maximum length possible' })
  @IsNotEmpty({ message: 'The email is required' })
  email: string;

  @Length(8, 12, { message: 'The password needs between 8 and 12 characters' })
  @IsNotEmpty({ message: 'The password is required' })
  password: string;

  constructor(name: string, lastname: string, email: string, password: string) {
    super();
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;

    this.validateSelf();
  }
}
