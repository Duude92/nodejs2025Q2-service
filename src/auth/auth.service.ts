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
import { JwtPayload } from 'jsonwebtoken';
import { AUTH } from '../appconfig';

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
      return await this.generateTokenPair(payload);
    }
    throw new ForbiddenException('Incorrect login or password');
  }

  async generateTokenPair(payload: JwtPayload) {
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.generateRefreshToken(payload),
    };
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

  private async generateRefreshToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload, {
      expiresIn: AUTH.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }

  async updateToken(refreshToken: string) {
    try {
      const result = await this.jwtService.verifyAsync(refreshToken);
      console.log(result);
      if (!result)
        throw new ForbiddenException('Refresh token is invalid or expired');
      return this.generateTokenPair({
        userId: result.userId,
        login: result.login,
      });
    } catch (_) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }
}
