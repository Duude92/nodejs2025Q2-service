import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  createUser,
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { AUTH } from '../appconfig';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hash(
      createUserDto.password,
      AUTH.CRYPT_SALT,
    );
    const user = createUser(createUserDto);

    return await this.userRepository.save(user);
  }

  async updatePassword(id: string, changePassDto: UpdatePasswordDto) {
    const user = await this.validateUserExist(id);
    if (!(await compare(changePassDto.oldPassword, user.password)))
      // if (user.password !== changePassDto.oldPassword)
      throw new HttpException('Passwords does not match', HttpStatus.FORBIDDEN);

    user.password = await hash(changePassDto.newPassword, AUTH.CRYPT_SALT);
    user.version += 1;
    user.updatedAt = Date.now();

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string) {
    await this.validateUserExist(id);
    await this.userRepository.delete(id);
  }

  private async validateUserExist(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user)
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }
}
