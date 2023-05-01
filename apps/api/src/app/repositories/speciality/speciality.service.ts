import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speciality } from './entities';
import { CreateSpecialityDto, UpdateSpecialityDto } from './dto';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectRepository(Speciality)
    private repository: Repository<Speciality>
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
  async insert(createSpecialityDto: CreateSpecialityDto) {
    //TODO: Hacer
  }
  async update(id: number, updateSpecialityDto: UpdateSpecialityDto) {
    //TODO: Hacer
  }
  async remove(id: number) {
    //TODO: Hacer
  }
}
