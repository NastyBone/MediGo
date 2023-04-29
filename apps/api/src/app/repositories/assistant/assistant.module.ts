import { Module } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { AssistantController } from './assistant.controller';
import { Assistant } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Assistant])],
  providers: [AssistantService],
  controllers: [AssistantController],
})
export class AssistantModule {}
