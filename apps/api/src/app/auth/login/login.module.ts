import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../../repositories/users/users.module';
import { JwtAuthGuard } from '../jwt-auth/JwtAuth.guard';
import { JwtAuthModule } from '../jwt-auth/jwtAuth.module';
import { JwtStrategy } from '../strategies/jwtStrategy';
import { LocalStrategy } from '../strategies/localStrategy';
import { LoginService } from './login.service';

@Module({
  imports: [UsersModule, JwtModule, JwtAuthModule],
  providers: [
    LoginService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [LoginService],
})
export class LoginModule {}
