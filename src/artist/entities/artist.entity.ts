import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { randomUUID } from 'node:crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  @Column()
  grammy: boolean;
}

const createArtistWithDto = (artistDto: CreateArtistDto) => {
  const artist = new Artist();
  artist.id = randomUUID();
  artist.name = artistDto.name;
  artist.grammy = artistDto.grammy;
  return artist;
};

export const createArtist = (data: CreateArtistDto) =>
  createArtistWithDto(data);
