import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from '../repositories/album.repository';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [forwardRef(() => TrackModule)],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumService],
})
export class AlbumModule {}
