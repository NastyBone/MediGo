import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { Speciality } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../../auth/jwt-auth/jwtAuth.module';
import { UsersModule } from '../users';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [TypeOrmModule.forFeature([Speciality]), UsersModule, JwtAuthModule, DoctorModule],
  providers: [SpecialityService],
  controllers: [SpecialityController],
  exports: [SpecialityService]
})
export class SpecialityModule { }
