import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class Album {
  @IsUUID()
  id: string; // uuid v4
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  year: number;
  artistId: string | null; // refers to Artist
}
