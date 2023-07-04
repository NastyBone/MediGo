import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Doctor } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto, ResponseDoctorDto, UpdateDoctorDto } from './dto';
import { RecordService } from '../record/record.service';
import { CiteService } from '../cite/cite.service';
import { AvailabilityService } from '../availability/availability.service';
import { AssistantService } from '../assistant/assistant.service';
import { Roles } from '../users';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private repository: Repository<Doctor>,
    private recordService: RecordService,
    private citeService: CiteService,
    private availabilityService: AvailabilityService,
    private assistantService: AssistantService
  ) { }

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
        speciality: true,
      },
    });

    return data.filter((item) => {
      if (item.user.role == Roles.Doctor && !item.user.deleted) {
        return new ResponseDoctorDto(item)
      } else {
        this.remove(item.id)
      }
    });
  }

  async findValid(id: number): Promise<Doctor> {
    const data = this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: {
        user: true,
        speciality: true,
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
    const user = await this.findByUserId(createDoctorDto.userId);
    if (user) {
      throw new BadRequestException(
        'Este usuario ya está asignado como doctor'
      );
    }
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
      await this.repository.save(doctor);
      return this.findOne(doctor.id);
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
        id,
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
      doctor.user = null;
      doctor.deleted = true;
      await this.availabilityService.deleteByDoctors(doctor.id);
      await this.recordService.deleteByDoctors(doctor.id);
      await this.citeService.deleteByDoctors(doctor.id);
      await this.assistantService.deleteByDoctors(doctor.id)
      await this.repository.save(doctor);
      return doctor;
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
          speciality: true,
        },
      });
      if (doctor) {
        return new ResponseDoctorDto(doctor);
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Doctor no asignado');
    }
  }
  async findBySpeciality(specialityId: number): Promise<ResponseDoctorDto[]> {
    const doctorsBySpeciality = this.repository.find({
      where: {
        speciality: {
          id: specialityId,
        },
        deleted: false,
      },
      relations: {
        user: true,
        speciality: true,
      },
    });

    return doctorsBySpeciality;
  }

  async deleteBySpeciality(id: number): Promise<void | boolean> {
    const doctors = await this.repository.find({
      where: {
        deleted: false,
        speciality: {
          id,
        },
      },
    });

    if (doctors.length) {
      doctors.map((item) => (item.deleted = true));
      await this.repository.save(doctors);
    }
    console.log('SOFT DELETION: DOCTORS BY SPECIALITY');

    return true;
  }
}
