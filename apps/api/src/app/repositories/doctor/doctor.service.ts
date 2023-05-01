import { Injectable } from '@nestjs/common';
import { Doctor } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto, UpdateDoctorDto } from './dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private repository: Repository<Doctor>
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
  async insert(createDoctorDto: CreateDoctorDto) {
    //TODO: Hacer
  }
  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    //TODO: Hacer
  }
  async remove(id: number) {
    //TODO: Hacer
  }
  async findByUserId(id: number) {
    //TODO: Hacer
  }
}
