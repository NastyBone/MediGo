import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities';
import { CreatePatientDto, UpdatePatientDto } from './dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private repository: Repository<Patient>
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

  async insert(createPatientDto: CreatePatientDto) {
    //TODO: Hacer
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    //TODO: Hacer
  }

  async remove(id: number) {
    //TODO: Hacer
  }

  async findByUserId(id: number) {
    //TODO: Hacer
  }

  async findByDoctorCites(id: number) {
    //TODO: Hacer
  }
}
