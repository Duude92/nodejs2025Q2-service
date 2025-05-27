import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from '../repositories/album.repository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  create(createAlbumDto: CreateAlbumDto) {
    return 'This action adds a new album';
  }

  findAll() {
    return this.albumRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} album`;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: string) {
    return `This action removes a #${id} album`;
  }
}
