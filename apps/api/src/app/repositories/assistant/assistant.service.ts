import {
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

@Injectable()
export class AssistantService {
  constructor(
    @InjectRepository(Assistant)
    private repository: Repository<Assistant>
  ) {}

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
      },
      select: {
        user: {
          firstName: true,
          lastName: true,
        },
      },
    });

    return data.map((item) => new ResponseAssistantDto(item));
  }

  async findValid(id: number): Promise<Assistant> {
    const data = this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          firstName: true,
          lastName: true,
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
    try {
      const assistant = this.repository.create({
        doctor: {
          id: createAssistantDto.doctorId,
        },
        user: {
          id: createAssistantDto.userId,
        },
      });
      return new ResponseAssistantDto(await this.repository.save(assistant));
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
      assistant.deleted = true;
      return new ResponseAssistantDto(await this.repository.save(assistant));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar asistante');
    }
  }
  async findByUserId(id: number): Promise<ResponseAssistantDto> {
    try {
      const assistant = await this.repository.findOne({
        where: {
          user: {
            id,
          },
          deleted: false,
        },
        relations: {
          user: true,
        },
        select: {
          user: {
            firstName: true,
            lastName: true,
          },
        },
      });
      return new ResponseAssistantDto(assistant);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al encontrar asistante');
    }
  }
}
