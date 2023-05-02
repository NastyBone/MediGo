import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { Record } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../../auth/jwt-auth/jwtAuth.module';
import { UsersModule } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UsersModule, JwtAuthModule],
  providers: [RecordService],
  controllers: [RecordController],
})
export class RecordModule {}
