import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { LoginDto } from './dto/signup';
import { AuthService } from './auth.service';
import { Public } from '../common/public/public.decorator';
import { LoggedExceptionFilter } from '../common/loggedexceptionfilter/loggedexception.filter';

@Controller('auth')
@UseFilters(LoggedExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: LoginDto) {
    return this.authService.signup(signupDto);
  }

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken) throw new UnauthorizedException();
    return await this.authService.updateToken(refreshToken);
  }
}
