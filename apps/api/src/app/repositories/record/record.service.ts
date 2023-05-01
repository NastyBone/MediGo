import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Record } from './entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordDto, ResponseRecordDto, UpdateRecordDto } from './dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private repository: Repository<Record>
  ) {}

  async findAll(): Promise<ResponseRecordDto[]> {
    const data = await this.repository.find({
      where: {
        deleted: false,
      },
      order: {
        date: 'ASC',
      },
      relations: {
        patient: true,
        doctor: {
          speciality: true,
        },
      },
      select: {
        patient: {
          user: {
            firstName: true,
            lastName: true,
          },
        },
        doctor: {
          user: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return data.map((item) => new ResponseRecordDto(item));
  }

  async findValid(id: number): Promise<Record> {
    const data = this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: {
        patient: true,
        doctor: {
          speciality: true,
        },
      },
      select: {
        patient: {
          user: {
            firstName: true,
            lastName: true,
          },
        },
        doctor: {
          user: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (!data) {
      throw new NotFoundException('Informe no encontrado.');
    }
    return data;
  }

  async findOne(id: number): Promise<ResponseRecordDto> {
    const record = await this.findValid(id);
    return new ResponseRecordDto(record);
  }

  async insert(createRecordDto: CreateRecordDto): Promise<ResponseRecordDto> {
    try {
      const record = this.repository.create({
        description: createRecordDto.description,
        date: new Date(createRecordDto.date).toLocaleDateString(),
        doctor: {
          id: createRecordDto.doctorId,
        },
        patient: {
          id: createRecordDto.patientId,
        },
      });
      return new ResponseRecordDto(await this.repository.save(record));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al registrar informe');
    }
  }

  async update(
    id: number,
    updateRecordDto: UpdateRecordDto
  ): Promise<ResponseRecordDto> {
    await this.findValid(id);
    try {
      const record = await this.repository.save({
        description: updateRecordDto.description,
        date: new Date(updateRecordDto.date).toLocaleDateString(),
        doctor: {
          id: updateRecordDto.doctorId,
        },
        patient: {
          id: updateRecordDto.patientId,
        },
      });
      return this.findOne(record.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al modificar informe');
    }
  }
  async remove(id: number): Promise<ResponseRecordDto> {
    try {
      const record = await this.findValid(id);
      record.deleted = true;
      return new ResponseRecordDto(await this.repository.save(record));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar informe');
    }
  }
  async findByPatient(id: number): Promise<ResponseRecordDto[]> {
    try {
      const record = await this.repository.find({
        where: {
          patient: {
            id,
          },
          deleted: false,
        },
        relations: {
          patient: true,
          doctor: {
            speciality: true,
          },
        },
        select: {
          patient: {
            user: {
              firstName: true,
              lastName: true,
            },
          },
          doctor: {
            user: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      return record.map((item) => new ResponseRecordDto(item));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al encontrar citas');
    }
  }

  async findByDoctor(id: number): Promise<ResponseRecordDto[]> {
    try {
      const record = await this.repository.find({
        where: {
          doctor: {
            id,
          },
          deleted: false,
        },
        relations: {
          patient: true,
          doctor: {
            speciality: true,
          },
        },
        select: {
          patient: {
            user: {
              firstName: true,
              lastName: true,
            },
          },
          doctor: {
            user: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      return record.map((item) => new ResponseRecordDto(item));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al encontrar citas');
    }
  }
}
