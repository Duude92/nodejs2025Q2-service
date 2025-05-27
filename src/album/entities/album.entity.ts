import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { randomUUID } from 'node:crypto';

export class Album {
  @IsUUID()
  id: string; // uuid v4
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  @IsUUID()
  artistId: string | null; // refers to Artist
  constructor(data: CreateAlbumDto) {
    this.id = randomUUID();
    this.name = data.name;
    this.year = data.year;
    this.artistId = data.artistId;
  }
}

export const createAlbum = (createAlbumDto: CreateAlbumDto) =>
  new Album(createAlbumDto);
