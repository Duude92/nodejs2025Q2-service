import { IEntity } from '../../repositories/IEntity';
import { IsUUID } from 'class-validator';
import { CreateTrackDto } from '../dto/create-track.dto';
import { randomUUID } from 'node:crypto';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class Track implements IEntity {
  @IsUUID('4', { each: false })
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @OneToOne(() => Artist)
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;
  @Column({ type: 'text', nullable: true })
  artistId: string | null; // refers to Artist
  @OneToOne(() => Album, (album) => album.id)
  @JoinColumn({ name: 'albumId' })
  album: Album;
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
