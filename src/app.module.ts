import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as datasource from './datasource';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasource.default.options,
        retryDelay: 3000,
        retryAttempts: 10,
      }),
    }),
  ],
})
export class AppModule {}
