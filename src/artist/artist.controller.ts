import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UUIDParam } from '../uuidparam/uuidparam.decorator';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@UUIDParam('id') id: string) {
    const artist = await this.artistService.findOne(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  @Put(':id')
  update(
    @UUIDParam('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@UUIDParam('id') id: string) {
    return this.artistService.remove(id);
  }
}
