import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH } from '../../appconfig';

@Injectable()
export class RestGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers as Headers & { authorization?: string };
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException('Access token is missing or invalid');
    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: AUTH.JWT_SECRET_KEY,
      });
    } catch (_) {
      throw new UnauthorizedException('Access token is missing or invalid');
    }
    return true;
  }
}
