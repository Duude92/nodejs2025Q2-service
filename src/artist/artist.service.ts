import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from '../repositories/artist.repository';
import { createArtist } from './entities/artist.entity';
import { TrackRepository } from '../repositories/track.repository';
import { AlbumRepository } from '../repositories/album.repository';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = createArtist(createArtistDto);
    return this.artistRepository.save(newArtist);
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
    const tracks = await this.trackRepository.find({ where: { artistId: id } });
    tracks.forEach((track) => {
      track.artistId = null;
      this.trackRepository.save(track);
    });
    const albums = await this.albumRepository.find({ where: { artistId: id } });
    albums.forEach((album) => {
      album.artistId = null;
      this.albumRepository.save(album);
    });
    //TODO: implement same removing code for albums
    return this.artistRepository.delete(id);
  }
}
