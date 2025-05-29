import { IEntity } from '../../repositories/IEntity';
import { IsUUID } from 'class-validator';
import { CreateTrackDto } from '../dto/create-track.dto';
import { randomUUID } from 'node:crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Track implements IEntity {
  @IsUUID('4', { each: false })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @Column({ type: 'text', nullable: true })
  artistId: string | null; // refers to Artist
  @Column({ type: 'text', nullable: true })
  albumId: string | null; // refers to Album
  @Column()
  duration: number; // integer number
}

const createTrackWithDto = (dto: CreateTrackDto) => {
  const track = new Track();
  track.id = randomUUID();
  track.name = dto.name;
  track.artistId = dto.artistId;
  track.albumId = dto.albumId;
  track.duration = dto.duration;
  return track;
};

export const createTrack = (track: CreateTrackDto) => createTrackWithDto(track);
