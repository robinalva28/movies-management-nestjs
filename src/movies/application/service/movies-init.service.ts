import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MoviesEntity } from '../../adapter/out/persistence/movies.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MoviesInitService implements OnModuleInit {
  private readonly logger = new Logger(MoviesInitService.name);

  constructor(
    @InjectModel(MoviesEntity.name)
    private readonly moviesModel: Model<MoviesEntity>,
  ) {}

  async onModuleInit() {
    const count = await this.moviesModel.countDocuments();
    if (count === 0) {
      const defaultMovies = [
        {
          _id: uuidv4(),
          title: 'The Last Horizon',
          episodeId: 'E1',
          synopsis:
            'In a distant future, humanity must find a new home as Earth becomes uninhabitable.',
          director: 'James Corban',
          producer: 'Amelia Stone',
          releaseDate: new Date('2023-03-15'),
          characters: 'Captain Aria Stone, Dr. Elias Winters',
        },
        {
          _id: uuidv4(),
          title: 'Echoes of the Past',
          episodeId: 'E2',
          synopsis:
            'A young archaeologist discovers a secret that could change the history of humankind.',
          director: 'Lara Monroe',
          producer: 'Gideon Scott',
          releaseDate: new Date('2024-06-07'),
          characters: 'Sarah Blake, Professor Jonathan Reeves',
        },
        {
          _id: uuidv4(),
          title: 'The Timekeeper’s Dilemma',
          episodeId: 'E3',
          synopsis:
            'A scientist invents a time-travel device but must navigate its unintended consequences.',
          director: 'Roland West',
          producer: 'Hannah Kim',
          releaseDate: new Date('2025-09-21'),
          characters: 'Dr. Morgan West, Lucas Kane',
        },
        {
          _id: uuidv4(),
          title: 'Beyond the Veil',
          episodeId: 'E4',
          synopsis:
            'A detective investigates a series of supernatural events in a quiet town.',
          director: 'Jules Hart',
          producer: 'Freya Ashford',
          releaseDate: new Date('2026-11-13'),
          characters: 'Detective Ray Collins, Emily Vaughn',
        },
        {
          _id: uuidv4(),
          title: 'Echoes of Eternity',
          episodeId: 'E5',
          synopsis:
            'Two strangers find their destinies intertwined across different timelines.',
          director: 'Alex Rivers',
          producer: 'Miles Reed',
          releaseDate: new Date('2027-04-05'),
          characters: 'Nora Sinclair, Aaron Pierce',
        },
      ];
      await this.moviesModel.insertMany(defaultMovies);

      this.logger.debug(
        'Default movies inserted, tryng to consume the API of StarWars...',
      );
     //TODO: POR ACA COLOCAR EL INTERNAL REST QUE CONSUMA LA API DE STARWARS
    }
  }
}
