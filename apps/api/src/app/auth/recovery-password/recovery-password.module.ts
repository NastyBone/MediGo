import { Module } from '@nestjs/common';
import { RecoveryPasswordService } from './recovery-password.service';
// import { UsersModule } from '../../repositories/users/users.module'; //FIXME: Descomentar
import { MailModule } from '../../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthModule } from '../jwt-auth';

@Module({
  providers: [RecoveryPasswordService],
  imports: [
    // UsersModule,
    MailModule,
    JwtModule,
    JwtAuthModule,
  ],
  exports: [RecoveryPasswordService],
})
export class RecoveryPasswordModule {}
