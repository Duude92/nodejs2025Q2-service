import { Album, createAlbum } from '../album/entities/album.entity';
import { Repository } from './repository';
import { Injectable } from '@nestjs/common';

const albumStorage: Array<Album> = [
  createAlbum({ name: 'Album1', artistId: 'some-random-id', year: 1900 }),
  createAlbum({ name: 'Album2', artistId: null, year: 1 }),
];

@Injectable()
export class AlbumRepository extends Repository<Album> {
  constructor() {
    super(albumStorage);
  }
}
