import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH } from '../../appconfig';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../public/public.decorator';

@Injectable()
export class RestGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers as Headers & { authorization?: string };
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

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
