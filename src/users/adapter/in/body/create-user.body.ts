import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBody {
  @ApiProperty({ example: 'John', description: 'The name of the user' })
  name: string;
  @ApiProperty({ example: 'Doe', description: 'The lastname of the user' })
  lastname: string;
  @ApiProperty({
    example: 'mail@mail.com',
    description: 'The email of the user',
  })
  email: string;
  @ApiProperty({ example: '123456', description: 'The password of the user' })
  password: string;
  @ApiProperty({
    example: 'http://example.com/image.jpg',
    description: 'The profile image url of the user',
  })
  profileImageUrl: string;
}
