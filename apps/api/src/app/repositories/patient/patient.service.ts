import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities';
import { CreatePatientDto, ResponsePatientDto, UpdatePatientDto } from './dto';
import { CiteService } from '../cite/cite.service';
import { RecordService } from '../record/record.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private repository: Repository<Patient>,
    private citeService: CiteService,
    private recordService: RecordService
  ) {}

  async findAll(): Promise<ResponsePatientDto[]> {
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
    });

    return data.map((item) => new ResponsePatientDto(item));
  }

  async findValid(id: number): Promise<Patient> {
    const data = this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: {
        user: true,
      },
    });
    if (!data) {
      throw new NotFoundException('Paciente no encontrado.');
    }
    return data;
  }

  async findOne(id: number): Promise<ResponsePatientDto> {
    const patient = await this.findValid(id);
    return new ResponsePatientDto(patient);
  }

  async insert(
    createPatientDto: CreatePatientDto
  ): Promise<ResponsePatientDto> {
    const user = await this.findByUserId(createPatientDto.userId);
    if (user) {
      throw new BadRequestException(
        'Este usuario ya está asignado como paciente'
      );
    }
    try {
      const patient = this.repository.create({
        address: createPatientDto.address,
        phone: createPatientDto.phone,
        user: {
          id: createPatientDto.userId,
        },
      });
      await this.repository.save(patient);
      return this.findOne(patient.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al registrar paciente');
    }
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto
  ): Promise<ResponsePatientDto> {
    await this.findValid(id);
    try {
      const patient = await this.repository.save({
        id,
        address: updatePatientDto.address,
        phone: updatePatientDto.phone,
        user: {
          id: updatePatientDto.userId,
        },
      });
      return this.findOne(patient.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al modificar paciente');
    }
  }

  async remove(id: number): Promise<ResponsePatientDto> {
    try {
      const patient = await this.findValid(id);
      patient.deleted = true;
      patient.user = null;
      await this.citeService.deleteByPatients(patient.id);
      await this.recordService.deleteByPatients(patient.id);
      await this.repository.save(patient);
      return patient;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar paciente');
    }
  }

  async findByUserId(id: number) {
    try {
      const patient = await this.repository.findOne({
        where: {
          deleted: false,
          user: {
            id,
          },
        },
        relations: {
          user: true,
        },
      });
      if (patient) {
        return new ResponsePatientDto(patient);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Paciente no asignado');
    }
  }
}
