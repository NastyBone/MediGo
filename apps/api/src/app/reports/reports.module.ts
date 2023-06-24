import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { SettingsModule } from '../repositories/settings/settings.module';
@Module({
  imports: [SettingsModule],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
