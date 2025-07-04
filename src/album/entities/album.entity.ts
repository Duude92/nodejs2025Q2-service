import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { randomUUID } from 'node:crypto';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Album {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @Column()
  year: number;
  @IsUUID()
  @Column({ type: 'text', nullable: true })
  artistId: string | null; // refers to Artist
  @OneToOne(() => Artist, (artist) => artist.id)
  @JoinColumn({ name: 'artistId' })
  artist: Artist;
}

const createAlbumWithDto = (data: CreateAlbumDto) => {
  const album = new Album();
  album.id = randomUUID();
  album.name = data.name;
  album.year = data.year;
  album.artistId = data.artistId;
  return album;
};

export const createAlbum = (createAlbumDto: CreateAlbumDto) =>
  createAlbumWithDto(createAlbumDto);
