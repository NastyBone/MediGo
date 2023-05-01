import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assistant } from './entities';
import { CreateAssistantDto, UpdateAssistantDto } from './dto';

@Injectable()
export class AssistantService {
  constructor(
    @InjectRepository(Assistant)
    private repository: Repository<Assistant>
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
  async insert(createAssistantDto: CreateAssistantDto) {
    //TODO: Hacer
  }
  async update(id: number, updateAssistantDto: UpdateAssistantDto) {
    //TODO: Hacer
  }
  async remove(id: number) {
    //TODO: Hacer
  }
  async findByUserId(id: number) {
    //TODO: Hacer
  }
}
