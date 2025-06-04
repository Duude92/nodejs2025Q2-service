import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/signup';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signup(@Body() signupDto: LoginDto) {}

  @Post('login')
  async login(@Body() signupDto: LoginDto) {}

  @Post('refresh')
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {}
}
