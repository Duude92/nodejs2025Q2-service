import { IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'node:crypto';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Column({ type: 'text', array: true })
  @IsString({ each: true })
  artists: string[]; // favorite artists ids
  @Column({ type: 'text', array: true })
  @IsString({ each: true })
  albums: string[]; // favorite albums ids
  @Column({ type: 'text', array: true })
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
