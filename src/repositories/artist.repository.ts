import { Artist, createArtist } from '../artist/entities/artist.entity';
import { Repository } from './repository';

const artistStorage: Array<Artist> = [
  createArtist({ name: 'Artist', grammy: true }),
  createArtist({ name: 'New Artist', grammy: false }),
];

export class ArtistRepository extends Repository<Artist> {
  constructor() {
    super(artistStorage);
  }
}
