import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Record } from './entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordDto, ResponseRecordDto, UpdateRecordDto } from './dto';
import { ReportsService } from '../../reports/reports.service';
import { ReportsResponseDto } from '../../reports/dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private repository: Repository<Record>,
    private reportService: ReportsService
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
        patient: {
          user: true,
        },
        doctor: {
          speciality: true,
          user: true,
        },
      },
    });

    return data.map((item) => new ResponseRecordDto(item));
  }

  async findValid(id: number): Promise<Record> {
    const data = this.repository.findOne({
      where: {
        deleted: false,
        id,
      },
      order: {
        date: 'ASC',
      },
      relations: {
        patient: {
          user: true,
        },
        doctor: {
          speciality: true,
          user: true,
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
        date: new Date(createRecordDto.date).toLocaleDateString('es-ES'),
        doctor: {
          id: createRecordDto.doctorId,
        },
        patient: {
          id: createRecordDto.patientId,
        },
      });
      const newRecord = await this.repository.save(record);
      return this.findOne(newRecord.id);
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
        id,
        description: updateRecordDto.description,
        date: new Date(updateRecordDto.date).toLocaleDateString('es-ES'),
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
          deleted: false,
          patient: {
            id,
          },
        },
        order: {
          date: 'ASC',
        },
        relations: {
          patient: {
            user: true,
          },
          doctor: {
            speciality: true,
            user: true,
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
          deleted: false,
          doctor: {
            id,
          },
        },
        order: {
          date: 'ASC',
        },
        relations: {
          patient: {
            user: true,
          },
          doctor: {
            speciality: true,
            user: true,
          },
        },
        select: {
          patient: {
            id: true,
            user: {
              firstName: true,
              lastName: true,
            },
          },
          doctor: {
            id: true,
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

  async generate(id: number): Promise<ReportsResponseDto> {
    const toGenerate = await this.findOne(id);
    console.log(toGenerate);
    const response = await this.reportService.generateReport({
      data: toGenerate,
    });
    return response;
  }

  async deleteByPatients(id: number): Promise<void | boolean> {
    const records = await this.repository.find({
      where: {
        deleted: false,
        patient: {
          id,
        },
      },
    });

    if (records.length) {
      records.map((item) => (item.deleted = true));
      await this.repository.save(records);
    }
    console.log('SOFT DELETION: RECORDS BY PATIENT');
    return true;
  }

  async deleteByDoctors(id: number): Promise<void | boolean> {
    const records = await this.repository.find({
      where: {
        deleted: false,
        doctor: {
          id,
        },
      },
    });

    if (records.length) {
      records.map((item) => (item.deleted = true));
      await this.repository.save(records);
    }
    console.log('SOFT DELETION: RECORDS BY DOCTOR');

    return true;
  }
}
