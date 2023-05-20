import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { AlertGateway } from './alert.gateway';

@Module({
  providers: [CronService, AlertGateway],
  exports: [CronService],
})
export class CronModule {}
