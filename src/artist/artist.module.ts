import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from '../repositories/artist.repository';
import { TrackRepository } from '../repositories/track.repository';
import { AlbumRepository } from '../repositories/album.repository';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    ArtistRepository,
    TrackRepository,
    AlbumRepository,
  ],
})
export class ArtistModule {}
