import { IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'node:crypto';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';

export class Favorites {
  @IsUUID()
  readonly id: string;
  @IsString({ each: true })
  artists: string[]; // favorite artists ids
  @IsString({ each: true })
  albums: string[]; // favorite albums ids
  @IsString({ each: true })
  tracks: string[]; // favorite tracks ids
  constructor() {
    this.id = randomUUID();
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}

export interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
