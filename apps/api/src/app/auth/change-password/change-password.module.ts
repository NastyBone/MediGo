import { Module } from '@nestjs/common';
// import { UsersModule } from '../../repositories/users'; //FIXME: Descomentar
import { JwtAuthModule } from '../jwt-auth/jwtAuth.module';
import { ChangePasswordService } from './change-password.service';

@Module({
  providers: [ChangePasswordService],
  imports: [
    // UsersModule,
    JwtAuthModule,
  ],
  exports: [ChangePasswordService],
})
export class ChangePasswordModule {}
