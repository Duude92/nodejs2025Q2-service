import { createTrack, Track } from '../../track/entities/track.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from './repository';

const trackStorage: Array<Track> = [
  createTrack({ name: 'abc', albumId: 'abc2', artistId: '212', duration: 313 }),
  createTrack({ name: 'ab2', albumId: 'ab3', artistId: '212', duration: 415 }),
];

@Injectable()
export class TrackRepository extends Repository<Track> {
  constructor() {
    super(trackStorage);
  }
}
