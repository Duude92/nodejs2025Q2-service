import { forwardRef, Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entities/fav.entity';

@Module({
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([Favorites]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
