import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './entities';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private repository: Repository<Availability>
  ) {}
}
