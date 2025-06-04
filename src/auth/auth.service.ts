import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/signup';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        login: loginDto.login,
      },
      select: ['password'],
    });
    return await compare(loginDto.password, user.password);
  }

  async signup(signupDto: LoginDto) {
    return Promise.resolve(undefined);
  }
}
