import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/signup';
import { AuthService } from './auth.service';
import { Public } from '../common/public/public.decorator';

@Controller('auth')
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
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {}
}
