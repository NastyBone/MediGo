import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Doctor } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto, ResponseDoctorDto, UpdateDoctorDto } from './dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private repository: Repository<Doctor>
  ) {}

  async findAll(): Promise<ResponseDoctorDto[]> {
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

    return data.map((item) => new ResponseDoctorDto(item));
  }

  async findValid(id: number): Promise<Doctor> {
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
      throw new NotFoundException('Doctor no encontrado.');
    }
    return data;
  }

  async findOne(id: number): Promise<ResponseDoctorDto> {
    const doctor = await this.findValid(id);
    return new ResponseDoctorDto(doctor);
  }
  async insert(createDoctorDto: CreateDoctorDto): Promise<ResponseDoctorDto> {
    try {
      const doctor = this.repository.create({
        phone: createDoctorDto.phone,
        speciality: {
          id: createDoctorDto.specialityId,
        },
        user: {
          id: createDoctorDto.userId,
        },
      });
      return new ResponseDoctorDto(await this.repository.save(doctor));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al registrar doctor');
    }
  }
  async update(
    id: number,
    updateDoctorDto: UpdateDoctorDto
  ): Promise<ResponseDoctorDto> {
    await this.findValid(id);
    try {
      const doctor = await this.repository.save({
        phone: updateDoctorDto.phone,
        speciality: {
          id: updateDoctorDto.specialityId,
        },
        user: {
          id: updateDoctorDto.userId,
        },
      });
      return this.findOne(doctor.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al modificar doctor');
    }
  }
  async remove(id: number): Promise<ResponseDoctorDto> {
    try {
      const doctor = await this.findValid(id);
      doctor.deleted = true;
      return new ResponseDoctorDto(await this.repository.save(doctor));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar doctor');
    }
  }
  async findByUserId(id: number): Promise<ResponseDoctorDto> {
    try {
      const doctor = await this.repository.findOne({
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
      return new ResponseDoctorDto(doctor);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al encontrar asistante');
    }
  }
  async findByPatients() {
    //TODO: Preguntar si los pacientes y doctores estan directamente relacionados
    // En caso de que si, se necesita una tabla extra para esta relacion
    // Estableciendo la relacion de patient_id y doctor_id
  }
}
