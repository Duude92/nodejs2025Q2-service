import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites, IFavoritesResponse } from './entities/fav.entity';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEntity } from '../common/repositories/IEntity';

@Injectable()
export class FavsService {
  private readonly services: {
    artists: ArtistService;
    tracks: TrackService;
    albums: AlbumService;
  };

  constructor(
    @InjectRepository(Favorites)
    private readonly favouriteRepository: Repository<Favorites>,
    private readonly artistsService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {
    this.services = {
      artists: artistsService,
      tracks: trackService,
      albums: albumService,
    };
    this.favouriteRepository.find().then((result) => {
      if (!result[0]) this.favouriteRepository.save(new Favorites());
    });
  }

  async validateRouteAndGetFavs(route: string) {
    const favs = (await this.favouriteRepository.find())[0];
    if (!favs)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const field = route + 's';
    if (!(field in favs))
      throw new HttpException(
        `Resource ${route} not found`,
        HttpStatus.NOT_FOUND,
        {
          cause: new Error('Not found'),
        },
      );
    return { favs, field };
  }

  async findAll(): Promise<IFavoritesResponse> {
    // We always should have first one favourites list
    const favs = (await this.favouriteRepository.find())[0];
    if (!favs)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const result = favs;
    return result;
  }

  async remove(id: string, route: string) {
    const { favs, field } = await this.validateRouteAndGetFavs(route);
    const idx = favs[field].findIndex((fav: IEntity) => fav.id === id);
    favs[field].splice(idx, 1);
    await this.favouriteRepository.save(favs);
    return 'Deleted successfully';
  }

  async add(id: string, route: string) {
    const { favs, field } = await this.validateRouteAndGetFavs(route);
    try {
      const exist = await this.services[field].findOne(id);
      if (!exist) throw new UnprocessableEntityException();
      favs[field].push(exist);
      await this.favouriteRepository.save(favs);
    } catch (_error) {
      throw new UnprocessableEntityException();
    }
    return 'Added successfully';
  }
}
