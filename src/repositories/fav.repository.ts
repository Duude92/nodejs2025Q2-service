import { Injectable } from '@nestjs/common';
import { Repository } from './repository';
import { Favorites } from '../favs/entities/fav.entity';

const favouritesRepository: Array<Favorites> = [new Favorites()];

@Injectable()
export class FavRepository extends Repository<Favorites> {
  constructor() {
    super(favouritesRepository);
  }
}
