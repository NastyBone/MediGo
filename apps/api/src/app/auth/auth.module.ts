import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ChangePasswordModule } from './change-password/change-password.module';
import { LoginModule } from './login';
import { LogoutModule } from './logout';
import { RecoveryPasswordModule } from './recovery-password/recovery-password.module';

@Module({
  controllers: [AuthController],
  imports: [
    LogoutModule,
    RecoveryPasswordModule,
    ChangePasswordModule,
    LoginModule,
  ],
})
export class AuthModule {}
