import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';
import { UUIDParam } from '../uuidparam/uuidparam.decorator';
import { IFavoritesResponse } from './entities/fav.entity';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post(':route/:id')
  create(@UUIDParam('id') id: string, @Param('route') route: string) {
    return this.favsService.add(id, route);
  }

  @Get()
  findAll(): Promise<IFavoritesResponse> {
    return this.favsService.findAll();
  }

  @Delete(':route/:id')
  @HttpCode(204)
  remove(@UUIDParam('id') id: string, @Param('route') route: string) {
    return this.favsService.remove(id, route);
  }
}
