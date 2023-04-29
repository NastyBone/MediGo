import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speciality } from './entities';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectRepository(Speciality)
    private repository: Repository<Speciality>
  ) {}
}
