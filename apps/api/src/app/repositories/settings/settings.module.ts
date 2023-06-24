import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from './entities';
import { UsersModule } from '../users';
import { JwtAuthModule } from '../../auth/jwt-auth/jwtAuth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Settings]), UsersModule, JwtAuthModule],
  providers: [SettingsService],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule {}
