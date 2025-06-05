import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { LoginDto } from './dto/signup';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        login: loginDto.login,
      },
      select: ['id', 'password'],
    });

    if (await compare(loginDto.password, user.password)) {
      const payload = { userId: user.id, login: loginDto.login };

      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: 'refresh',
      };
    }
    throw new ForbiddenException('Incorrect login or password');
  }

  async signup(signupDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        login: signupDto.login,
      },
    });
    if (!!user) throw new ConflictException('Conflict. Login already exists');
    return await this.userService.create(signupDto);
  }
}
