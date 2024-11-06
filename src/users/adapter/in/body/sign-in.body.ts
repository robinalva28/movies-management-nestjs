import { ApiProperty } from '@nestjs/swagger';

export class SignInBody {
  @ApiProperty({ example: 'mail5@mail.com' })
  email: string;
  @ApiProperty({ example: '123456' })
  password: string;
}
