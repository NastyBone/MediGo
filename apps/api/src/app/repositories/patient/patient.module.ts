import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../../auth/jwt-auth';
import { UsersModule } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), UsersModule, JwtAuthModule],
  providers: [PatientService],
  controllers: [PatientController],
})
export class PatientModule {}
