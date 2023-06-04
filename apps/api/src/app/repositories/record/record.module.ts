import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { Record } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../../auth/jwt-auth/jwtAuth.module';
import { UsersModule } from '../users';
import { ReportsModule } from '../../reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    UsersModule,
    JwtAuthModule,
    ReportsModule,
  ],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
