import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from '../repositories/album.repository';
import { TrackRepository } from '../repositories/track.repository';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository, TrackRepository],
})
export class AlbumModule {}
