import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { LoggedMiddleware } from './common/loggedmiddleware/logged.middleware';
import { LoggedInterceptor } from './common/loggedinterceptor/logged.interceptor';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    AuthModule,
    LoggerModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasource.default.options,
        retryDelay: 3000,
        retryAttempts: 10,
      }),
    }),
  ],
  providers: [LoggedExceptionFilter, LoggedInterceptor],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggedMiddleware).forRoutes('*');
  }
}
