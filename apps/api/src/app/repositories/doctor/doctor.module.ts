import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../../auth/jwt-auth/jwtAuth.module';
import { UsersModule } from '../users';
import { CiteModule } from '../cite/cite.module';
import { RecordModule } from '../record/record.module';
import { AvailabilityModule } from '../availability/availability.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    UsersModule,
    JwtAuthModule,
    CiteModule,
    RecordModule,
    AvailabilityModule,
  ],
  providers: [DoctorService],
  controllers: [DoctorController],
})
export class DoctorModule {}
