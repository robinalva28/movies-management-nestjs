export class Movie {
  movieId: string;
  title: string;
  episodeId: string;
  synopsis: string;
  director: string;
  producer: string;
  releaseDate: Date;
  characters: string;

  constructor(
    movieId: string,
    title: string,
    episodeId: string,
    synopsis: string,
    director: string,
    producer: string,
    releaseDate: Date,
    characters: string,
  ) {
    this.movieId = movieId;
    this.title = title;
    this.episodeId = episodeId;
    this.synopsis = synopsis;
    this.director = director;
    this.producer = producer;
    this.releaseDate = releaseDate;
    this.characters = characters;
  }
}
