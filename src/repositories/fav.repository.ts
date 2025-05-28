import { Injectable } from '@nestjs/common';
import { Repository } from './repository';

const favouritesRepository: Array<Fav> = [new Fav()];

@Injectable()
export class FavRepository extends Repository<Fav> {
  constructor() {
    super(favouritesRepository);
  }
}
