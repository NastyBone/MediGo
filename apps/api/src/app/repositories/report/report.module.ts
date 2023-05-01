import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { CiteModule } from '../cite/cite.module';
import { JwtAuthModule } from '../../auth/jwt-auth';
import { UsersModule } from '../users';

@Module({
  imports: [UsersModule, JwtAuthModule],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
