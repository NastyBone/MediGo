import { Module } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { AssistantController } from './assistant.controller';
import { Assistant } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../../auth/jwt-auth/jwtAuth.module';
import { UsersModule } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([Assistant]), UsersModule, JwtAuthModule],
  providers: [AssistantService],
  exports: [AssistantService],
  controllers: [AssistantController],
})
export class AssistantModule { }
