import { Injectable } from '@nestjs/common';
import { Record } from './entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordDto, UpdateRecordDto } from './dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private repository: Repository<Record>
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
  async insert(createRecordDto: CreateRecordDto) {
    //TODO: Hacer
  }
  async update(id: number, updateRecordDto: UpdateRecordDto) {
    //TODO: Hacer
  }
  async remove(id: number) {
    //TODO: Hacer
  }
  async findByPatient(id: number) {
    //TODO: Hacer
  }

  async findByDoctor(id: number) {
    //TODO: Hacer
  }
}
