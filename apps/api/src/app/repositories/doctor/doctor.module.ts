import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../../auth/jwt-auth';
import { UsersModule } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), UsersModule, JwtAuthModule],
  providers: [DoctorService],
  controllers: [DoctorController],
})
export class DoctorModule {}
