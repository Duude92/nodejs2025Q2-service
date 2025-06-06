import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as datasource from './datasource';
import { LoggerModule } from './common/logger/logger.module';
import { LoggedExceptionFilter } from './common/loggedexceptionfilter/loggedexception.filter';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    AuthModule,
    TypeOrmModule.forRoot(datasource.default.options),
    LoggerModule,
  ],
  providers: [LoggedExceptionFilter],
})
export class AppModule {}
