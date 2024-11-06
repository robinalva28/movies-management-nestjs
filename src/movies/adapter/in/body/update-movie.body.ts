import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieBody {
  @ApiProperty({ example: 'The Godfather' })
  title?: string;

  @ApiProperty({ example: '1' })
  episodeId?: string;

  @ApiProperty({
    example:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  })
  synopsis?: string;

  @ApiProperty({ example: 'Francis Ford Coppola' })
  director?: string;

  @ApiProperty({ example: 'Albert S. Ruddy' })
  producer?: string;

  @ApiProperty({ example: new Date().toISOString() })
  releaseDate?: Date;

  @ApiProperty({ example: 'Marlon Brando, Al Pacino, James Caan' })
  characters?: string;
}
