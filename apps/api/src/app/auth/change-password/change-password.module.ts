import { Module } from '@nestjs/common';
import { UsersModule } from '../../repositories/users';
import { JwtAuthModule } from '../jwt-auth/jwtAuth.module';
import { ChangePasswordService } from './change-password.service';

@Module({
  providers: [ChangePasswordService],
  imports: [UsersModule, JwtAuthModule],
  exports: [ChangePasswordService],
})
export class ChangePasswordModule {}
