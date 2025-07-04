import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist, createArtist } from './entities/artist.entity';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = createArtist(createArtistDto);
    return this.artistRepository.save(newArtist);
  }

  async validateEntityExists(id: string): Promise<boolean> {
    try {
      return !!(await this.findOne(id));
    } catch (_) {
      return false;
    }
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    return await this.artistRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const foundArtist = await this.artistRepository.findOne({
      where: { id: id },
    });
    if (!foundArtist)
      throw new NotFoundException(`Item with id ${id} not found.`);
    foundArtist.grammy = updateArtistDto.grammy;
    foundArtist.name = updateArtistDto.name;
    await this.artistRepository.save(foundArtist);

    return foundArtist;
  }

  async remove(id: string) {
    await this.trackService.clearArtist(id);
    await this.albumService.clearArtist(id);
    return this.artistRepository.delete(id);
  }
}
