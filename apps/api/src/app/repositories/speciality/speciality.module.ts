import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { Speciality } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../../auth/jwt-auth';
import { UsersModule } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([Speciality]), UsersModule, JwtAuthModule],
  providers: [SpecialityService],
  controllers: [SpecialityController],
})
export class SpecialityModule {}
