import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { randomUUID } from 'node:crypto';

export class Artist {
  @IsUUID()
  readonly id: string; // uuid v4
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;

  constructor(artistDto: CreateArtistDto) {
    this.id = randomUUID();
    this.name = artistDto.name;
    this.grammy = artistDto.grammy;
  }
}

export const createArtist = (data: CreateArtistDto) => new Artist(data);
