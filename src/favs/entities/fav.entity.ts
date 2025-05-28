import { IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'node:crypto';

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
