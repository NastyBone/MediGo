import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assistant } from './entities';
import {
  CreateAssistantDto,
  ResponseAssistantDto,
  UpdateAssistantDto,
} from './dto';
import { Roles } from '../users';

@Injectable()
export class AssistantService {
  constructor(
    @InjectRepository(Assistant)
    private repository: Repository<Assistant>
  ) { }

  async findAll(): Promise<ResponseAssistantDto[]> {
    const data = await this.repository.find({
      where: {
        deleted: false,
      },
      order: {
        user: {
          lastName: 'ASC',
        },
      },
      relations: {
        user: true,
        doctor: {
          speciality: true,
          user: true,
        },
      },
    });

    return data.filter((item) => {
      const newAssistant = new ResponseAssistantDto(item)
      if (newAssistant.user.role == Roles.Asistente) {
        return newAssistant
      } else {
        this.remove(item.id)
      }
    });

  }

  async findValid(id: number): Promise<Assistant> {
    const data = this.repository.findOne({
      where: {
        deleted: false,
        id,
      },
      order: {
        user: {
          lastName: 'ASC',
        },
      },
      relations: {
        user: true,
        doctor: {
          speciality: true,
          user: true,
        },
      },
    });
    if (!data) {
      throw new NotFoundException('Asistente no encontrado.');
    }
    return data;
  }

  async findOne(id: number): Promise<ResponseAssistantDto> {
    const patient = await this.findValid(id);
    return new ResponseAssistantDto(patient);
  }

  async insert(
    createAssistantDto: CreateAssistantDto
  ): Promise<ResponseAssistantDto> {
    const user = await this.findByUserId(createAssistantDto.userId);
    if (user) {
      throw new BadRequestException(
        'Este usuario ya está asignado como asistente'
      );
    }
    try {
      const assistant = this.repository.create({
        doctor: {
          id: createAssistantDto.doctorId,
        },
        user: {
          id: createAssistantDto.userId,
        },
      });
      await this.repository.save(assistant);
      return this.findOne(assistant.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al registrar asistente');
    }
  }
  async update(
    id: number,
    updateAssistantDto: UpdateAssistantDto
  ): Promise<ResponseAssistantDto> {
    await this.findValid(id);
    try {
      const assistant = await this.repository.save({
        id,
        doctor: {
          id: updateAssistantDto.doctorId,
        },
        user: {
          id: updateAssistantDto.userId,
        },
      });
      return this.findOne(assistant.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al modificar asistente');
    }
  }
  async remove(id: number): Promise<ResponseAssistantDto> {
    try {
      const assistant = await this.findValid(id);
      assistant.user = null;
      assistant.deleted = true;
      assistant.doctor = null
      await this.repository.save(assistant);
      return assistant;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar asistante');
    }
  }
  async findByUserId(id: number): Promise<ResponseAssistantDto> {
    try {
      const assistant = await this.repository.findOne({
        where: {
          deleted: false,
          user: {
            id,
          },
        },
        order: {
          user: {
            lastName: 'ASC',
          },
        },
        relations: {
          user: true,
          doctor: {
            speciality: true,
            user: true,
          },
        },
      });
      if (assistant) {
        return new ResponseAssistantDto(assistant);
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Asistente no asignado');
    }
  }

  async deleteByDoctors(id: number): Promise<void | boolean> {
    const assistant = await this.repository.findOne({
      where: {
        deleted: false,
        doctor: {
          id,
        },
      },
    });

    if (assistant) await this.remove(assistant.id)
    console.log('SOFT DELETION: ASSISTANT BY DOCTOR');

    return true;
  }
}
