import { ApiProperty } from '@nestjs/swagger';

export class CreateAdministratorRequestBody {
  @ApiProperty({ example: 'Marta' })
  name: string;
  @ApiProperty({ example: 'Zuluaga' })
  lastname: string;
  @ApiProperty({ example: 'mailmail@gmail.com' })
  email: string;
  @ApiProperty({ example: 'pass12345' })
  password: string;
}
