import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './user.entity';
import { UUIDParam } from '../common/uuidparam/uuidparam.decorator';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@UUIDParam('id') id: string) {
    const result = await this.userService.getUser(id);
    if (!result)
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async updatePassword(
    @UUIDParam('id') id: string,
    @Body() changePassDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, changePassDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@UUIDParam('id') id: string) {
    await this.userService.deleteUser(id);
  }
}
