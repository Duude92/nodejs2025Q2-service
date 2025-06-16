import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AUTH } from '../appconfig';
import { APP_GUARD } from '@nestjs/core';
import { RestGuard } from '../common/guard/rest.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: AUTH.JWT_SECRET_KEY,
      signOptions: { expiresIn: AUTH.TOKEN_EXPIRE_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: RestGuard }],
})
export class AuthModule {}
