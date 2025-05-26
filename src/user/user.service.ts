import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createUser, CreateUserDto, User } from './user.entity';

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
}
