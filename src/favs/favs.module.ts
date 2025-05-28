import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavRepository } from '../repositories/fav.repository';

@Module({
  controllers: [FavsController],
  providers: [FavsService, FavRepository],
})
export class FavsModule {}
