import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from '../repositories/track.repository';
import { createTrack } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.trackRepository.save(createTrack(createTrackDto));
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    return await this.extractAndValidateTrack(id);
  }

  private async extractAndValidateTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id: id } });
    if (!track)
      throw new HttpException(
        `Track with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.extractAndValidateTrack(id);

    Object.keys(updateTrackDto).forEach((key) => {
      track[key] = updateTrackDto[key];
    });
    return await this.trackRepository.save(track);
  }

  async clearArtist(artistId: string) {
    const tracks = await this.trackRepository.find({ where: { artistId } });
    tracks.forEach((track) => {
      track.artistId = null;
      this.trackRepository.save(track);
    });
  }

  async remove(id: string) {
    await this.extractAndValidateTrack(id);

    return await this.trackRepository.delete(id);
  }

  async clearAlbums(id: string) {
    const tracks = await this.trackRepository.find({ where: { albumId: id } });
    tracks.forEach((track) => {
      track.albumId = null;
      this.trackRepository.save(track);
    });
  }
}
