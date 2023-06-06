import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities';
import { CreatePatientDto, ResponsePatientDto, UpdatePatientDto } from './dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private repository: Repository<Patient>
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
      select: {
        user: {
          firstName: true,
          lastName: true,
        },
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
      select: {
        user: {
          firstName: true,
          lastName: true,
        },
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
    try {
      const patient = this.repository.create({
        address: createPatientDto.address,
        phone: createPatientDto.phone,
        user: {
          id: createPatientDto.userId,
        },
      });
      return new ResponsePatientDto(await this.repository.save(patient));
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
      return new ResponsePatientDto(await this.repository.save(patient));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar paciente');
    }
  }

  async findByUserId(id: number) {
    try {
      const cite = await this.repository.findOne({
        where: {
          deleted: false,
          user: {
            id,
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
      return new ResponsePatientDto(cite);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al encontrar paciente');
    }
  }
}
