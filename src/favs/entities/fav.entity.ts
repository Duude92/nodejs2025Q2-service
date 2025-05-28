import { IsString } from 'class-validator';

export class Favorites {
  @IsString({ each: true })
  artists: string[]; // favorite artists ids
  @IsString({ each: true })
  albums: string[]; // favorite albums ids
  @IsString({ each: true })
  tracks: string[]; // favorite tracks ids
  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
