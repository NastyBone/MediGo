import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cite } from './entities';
import { CreateCiteDto, UpdateCiteDto } from './dto';

@Injectable()
export class CiteService {
  constructor(
    @InjectRepository(Cite)
    private repository: Repository<Cite>
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
  async insert(createCiteDto: CreateCiteDto) {
    //TODO: Hacer
  }
  async update(id: number, updateCiteDto: UpdateCiteDto) {
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
