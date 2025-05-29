import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { randomUUID } from 'node:crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
