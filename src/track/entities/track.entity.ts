import { IEntity } from '../../repositories/IEntity';
import { IsUUID } from 'class-validator';
import { CreateTrackDto } from '../dto/create-track.dto';
import { randomUUID } from 'node:crypto';

export class Track implements IEntity {
  @IsUUID('4', { each: false })
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
  constructor({ name, artistId, albumId, duration }: CreateTrackDto) {
    this.id = randomUUID();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}

export const createTrack = (track: CreateTrackDto) => new Track(track);
