import { Module } from '@nestjs/common';
import { CiteService } from './cite.service';
import { CiteController } from './cite.controller';
import { Cite } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cite])],
  providers: [CiteService],
  controllers: [CiteController],
})
export class CiteModule {}
