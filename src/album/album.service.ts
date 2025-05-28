import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from '../repositories/album.repository';
import { createAlbum } from './entities/album.entity';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly trackService: TrackService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.save(createAlbum(createAlbumDto));
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    return await this.albumRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) throw new NotFoundException(`Album ${id} not found`);
    Object.keys(updateAlbumDto).forEach((key) => {
      album[key] = updateAlbumDto[key];
    });
    return await this.albumRepository.save(album);
  }

  async clearArtist(artistId: string) {
    const albums = await this.albumRepository.find({ where: { artistId } });
    albums.forEach((album) => {
      album.artistId = null;
      this.albumRepository.save(album);
    });
  }

  async remove(id: string) {
    await this.trackService.clearAlbums(id);
    return await this.albumRepository.delete(id);
  }
}
