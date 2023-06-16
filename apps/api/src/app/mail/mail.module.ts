import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('SMTP_HOST'),
            secure: false,
            port: 587,
            tls: { rejectUnauthorized: false },
            auth: {
              user: configService.get('SMTP_USER'),
              pass: configService.get('SMTP_PASS'),
            },
          },
          defaults: {
            from: configService.get('SMTP_FROM'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
