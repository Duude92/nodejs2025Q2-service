import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UUIDParam } from '../uuidparam/uuidparam.decorator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@UUIDParam('id') id: string) {
    const album = await this.albumService.findOne(id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  @Put(':id')
  async update(
    @UUIDParam('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@UUIDParam('id') id: string) {
    if (!(await this.albumService.validateEntityExists(id)))
      throw new NotFoundException('Album not found');
    return await this.albumService.remove(id);
  }
}
