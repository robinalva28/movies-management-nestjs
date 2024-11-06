import { ApiProperty } from '@nestjs/swagger';

export class SigninAdministratorBody {
  @ApiProperty({ example: 'imailmail@gmail.com' })
  email: string;

  @ApiProperty({ example: 'pass12345' })
  password: string;
}
