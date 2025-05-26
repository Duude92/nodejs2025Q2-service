import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import {
  createUser,
  CreateUserDto,
  UpdatePasswordDto,
  User,
} from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = createUser(createUserDto);

    return await this.userRepository.save(user);
  }

  async updatePassword(id: string, changePassDto: UpdatePasswordDto) {
    const user = await this.validateUserExist(id);
    if (user.password !== changePassDto.oldPassword)
      throw new HttpException('Passwords does not match', HttpStatus.FORBIDDEN);
    user.password = changePassDto.newPassword;
    user.version += 1;
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
