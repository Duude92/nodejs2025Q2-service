import { IsUUID } from 'class-validator';
import { randomUUID } from 'node:crypto';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @ManyToMany(() => Artist, (artist) => artist.id, { eager: true })
  @JoinTable()
  artists: Artist[]; // favorite artists ids
  @ManyToMany(() => Album, (album) => album.id, { eager: true })
  @JoinTable()
  albums: Album[]; // favorite albums ids
  @ManyToMany(() => Track, (track) => track.id, { eager: true })
  @JoinTable()
  tracks: Track[]; // favorite tracks ids
  constructor() {
    this.id = randomUUID();
  }
}

export interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
