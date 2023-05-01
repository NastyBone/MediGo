import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './entities';
import { CreateAvailabilityDto, UpdateAvailabilityDto } from './dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private repository: Repository<Availability>
  ) {}

  async findAll() {
    //TODO: Hacer
  }

  async findValid(id: number) {
    //TODO: Hacer
  }

  async findOne(id: number) {
    //TODO: Hacer
  }
  async insert(createAvailabilityDto: CreateAvailabilityDto) {
    //TODO: Hacer
  }
  async update(id: number, updateAvailabilityDto: UpdateAvailabilityDto) {
    //TODO: Hacer
  }
  async remove(id: number) {
    //TODO: Hacer
  }
  async findByDoctor(id: number) {
    //TODO: Hacer
  }
}
