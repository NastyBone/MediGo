import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assistant } from './entities';

@Injectable()
export class AssistantService {
  constructor(
    @InjectRepository(Assistant)
    private repository: Repository<Assistant>
  ) {}
}
