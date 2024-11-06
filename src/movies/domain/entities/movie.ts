export class Movie {
  _id: string;
  title: string;
  episodeId: string;
  synopsis: string;
  director: string;
  producer: string;
  releaseDate: Date;
  characters: string;

  constructor(
    _id: string,
    title: string,
    episodeId: string,
    synopsis: string,
    director: string,
    producer: string,
    releaseDate: Date,
    characters: string,
  ) {
    this._id = _id;
    this.title = title;
    this.episodeId = episodeId;
    this.synopsis = synopsis;
    this.director = director;
    this.producer = producer;
    this.releaseDate = releaseDate;
    this.characters = characters;
  }
}
