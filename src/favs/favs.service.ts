import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavRepository } from '../repositories/fav.repository';

async function validateRouteAndGetFavs(route: string) {
  const favs = await this.findAll();
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

@Injectable()
export class FavsService {
  constructor(private readonly favouriteRepository: FavRepository) {}

  async findAll() {
    // We always should have first one favourites list
    const favs = (await this.favouriteRepository.find())[0];
    if (!favs)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    // TODO: return entities instead
    return favs;
  }

  async remove(id: string, route: string) {
    const { favs, field } = await validateRouteAndGetFavs.call(this, route);
    const idx = favs[field].findIndex((fav: string) => fav === id);
    if (idx === -1) throw new NotFoundException();
    favs[field].splice(idx, 1);
    return favs[field];
  }

  async add(id: string, route: string) {
    const { favs, field } = await validateRouteAndGetFavs.call(this, route);
    favs[field].push(id);
    return favs[field];
  }
}
