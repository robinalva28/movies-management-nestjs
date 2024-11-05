import { Injectable, Logger } from '@nestjs/common';
import { GetAllMoviesUseCase } from '../port/in/get-all-movies.usecase';

@Injectable()
export class MoviesService implements GetAllMoviesUseCase {
  private readonly logger = new Logger(MoviesService.name);
  private mockedMovies = [
    {
      movieId: '1',
      title: 'A New Hope',
      episodeId: 'IV',
      synopsis:
        'The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance, and restore freedom and justice to the Galaxy.',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      releaseDate: new Date('1977-05-25T00:00:00.000Z'),
      characters:
        'Luke Skywalker, Darth Vader, Princess Leia, Han Solo, Obi-Wan Kenobi, C-3PO, R2-D2, Chewbacca, Yoda, Jabba the Hutt, Boba Fett, Lando Calrissian, Emperor Palpatine, Qui-Gon Jinn, Padmé Amidala, Mace Windu, Count Dooku, General Grievous, Darth Maul, Aayla Secura, Plo K',
    },
    {
      movieId: '2',
      title: 'The Empire Strikes Back',
      episodeId: 'V',
      synopsis:
        'The epic saga continues as Luke Skywalker, in hopes of defeating the evil Galactic Empire, learns the ways of the Jedi from aging master Yoda. But Darth Vader is more determined than ever to capture Luke. Meanwhile, rebel leader Princess Leia, cocky Han Solo, Chewbacca, and droids C-3PO and R2-D2 are thrown into various stages of capture, betrayal and despair.',
      director: 'Irvin Kershner',
      producer: 'Gary Kurtz, Rick McCallum',
      releaseDate: new Date('1980-05-21T00:00:00.000Z'),
      characters:
        'Luke Skywalker, Darth Vader, Princess Leia, Han Solo, Obi-Wan Kenobi, C-3PO, R2-D2, Chewbacca, Yoda, Jabba the Hutt, Boba Fett, Lando Calrissian, Emperor Palpatine, Qui-Gon Jinn, Padmé Amidala, Mace Windu, Count Dooku, General Grievous, Darth Maul, Aayla Secura, Plo K',
    },
    {
      movieId: '3',
      title: 'Return of the Jedi',
      episodeId: 'VI',
      synopsis:
        "As Rebel leaders map their strategy for an all-out attack on the Emperor's newer, bigger Death Star. Han Solo remains frozen in the cavernous desert fortress of Jabba the Hutt, the most loathsome outlaw in the universe, who is also keeping Princes",
      director: 'Richard Marquand',
      producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
      releaseDate: new Date('1983-05-25T00:00:00.000Z'),
      characters:
        'Luke Skywalker, Darth Vader, Princess Leia, Han Solo, Obi-Wan Kenobi, C-3PO, R2-D2, Chewbacca, Yoda, Jabba the Hutt, Boba Fett, Lando Calrissian, Emperor Palpatine, Qui-Gon Jinn, Padmé Amidala, Mace Windu, Count Dooku, General Grievous, Darth Maul, Aayla Secura, Plo K',
    },
  ];

  constructor() {}

  async getMovies() {
    return this.mockedMovies;
  }
}
