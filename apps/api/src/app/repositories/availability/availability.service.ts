import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './entities';
import {
  CreateAvailabilityDto,
  ResponseAvailabilityDto,
  UpdateAvailabilityDto,
} from './dto';
import { daysOfTheWeek } from '../../common/enums';
import {
  checkTimeConflict,
  checkTimeRange,
  getDayOfTheWeekByDate,
} from '@medigo/time-handler';
import { CiteService } from '../cite/cite.service';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private repository: Repository<Availability>,
    private citeService: CiteService
  ) { }

  async findAll(): Promise<ResponseAvailabilityDto[]> {
    const data = await this.repository.find({
      where: {
        deleted: false,
      },
      relations: {
        doctor: {
          speciality: true,
          user: true,
        },
      },
      order: {
        day: 'ASC',
      },
    });

    return data.map((item) => new ResponseAvailabilityDto(item));
  }

  async findValid(id: number): Promise<Availability> {
    const data = this.repository.findOne({
      where: {
        id,
        deleted: false,
      },
      relations: {
        doctor: {
          speciality: true,
          user: true,
        },
      },
    });
    if (!data) {
      throw new NotFoundException('Disponibilidad no encontrada.');
    }
    return data;
  }

  async findOne(id: number): Promise<ResponseAvailabilityDto> {
    const availability = await this.findValid(id);
    return new ResponseAvailabilityDto(availability);
  }
  async insert(
    createAvailabilityDto: CreateAvailabilityDto
  ): Promise<ResponseAvailabilityDto> {
    if (!checkTimeRange(createAvailabilityDto.start, createAvailabilityDto.end))
      throw new BadRequestException('Rango Invalido');
    const availableData = await this.findByDoctor(createAvailabilityDto.doctor.id)
    console.log(availableData)

    if (
      !checkTimeConflict(
        createAvailabilityDto.start,
        createAvailabilityDto.end,
        createAvailabilityDto.day,
        createAvailabilityDto.doctor.id,
        availableData
      )
    ) {
      throw new BadRequestException('Rango En Conflicto');
    }
    if (
      !Object.values(daysOfTheWeek).includes(
        createAvailabilityDto.day as daysOfTheWeek
      )
    ) {
      throw new BadRequestException('Día no definido');
    }

    try {
      const availability = this.repository.create({
        start: createAvailabilityDto.start,
        end: createAvailabilityDto.end,
        day: createAvailabilityDto.day,
        available: createAvailabilityDto.available,
        doctor: {
          id: createAvailabilityDto.doctorId,
        },
      });
      const newAvailability = await this.repository.save(availability);
      return this.findOne(newAvailability.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al registrar disponibilidad.'
      );
    }
  }
  async update(
    id: number,
    updateAvailabilityDto: UpdateAvailabilityDto
  ): Promise<ResponseAvailabilityDto> {
    await this.findValid(id);
    if (!checkTimeRange(updateAvailabilityDto.start, updateAvailabilityDto.end))
      throw new BadRequestException('Rango Invalido');

    if (
      !checkTimeConflict(
        updateAvailabilityDto.start,
        updateAvailabilityDto.end,
        updateAvailabilityDto.day,
        updateAvailabilityDto.doctor.id,
        await this.findByDoctor(updateAvailabilityDto.doctor.id)
      )
    ) {
      throw new BadRequestException('Rango En Conflicto');
    }
    try {
      if (
        !Object.values(daysOfTheWeek).includes(
          updateAvailabilityDto.day as daysOfTheWeek
        )
      ) {
        throw new BadRequestException('Día no definido');
      }
      const availability = await this.repository.save({
        id,
        start: updateAvailabilityDto.start,
        end: updateAvailabilityDto.end,
        date: updateAvailabilityDto.day,
        available: updateAvailabilityDto.available,
        doctor: {
          id: updateAvailabilityDto.doctorId,
        },
      });
      return this.findOne(availability.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al modificar disponibilidad.'
      );
    }
  }
  async remove(id: number): Promise<ResponseAvailabilityDto> {
    try {
      const availability = await this.findValid(id);
      availability.deleted = true;
      await this.citeService.deleteByAvailability(id);
      return new ResponseAvailabilityDto(
        await this.repository.save(availability)
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al eliminar disponibilidad'
      );
    }
  }
  async findByDoctor(id: number): Promise<ResponseAvailabilityDto[]> {
    try {
      const availability = await this.repository.find({
        where: {
          doctor: {
            id,
          },

          deleted: false,
        },
        relations: {
          doctor: {
            speciality: true,
            user: true,
          },
        },
      });
      return availability.map((item) => new ResponseAvailabilityDto(item));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al encontrar disponibilidad'
      );
    }
  }

  async findByDayOfWeek(
    date: string,
    id: number
  ): Promise<ResponseAvailabilityDto[]> {
    try {
      const availability = await this.repository.find({
        where: {
          day: getDayOfTheWeekByDate(date),
          doctor: {
            id,
          },
          deleted: false,
          available: true,
        },
        relations: {
          doctor: {
            speciality: true,
            user: true,
          },
        },
      });
      return availability.map((item) => new ResponseAvailabilityDto(item));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error al encontrar disponibilidad'
      );
    }
  }

  async deleteByDoctors(id: number): Promise<void | boolean> {
    const availabilities = await this.repository.find({
      where: {
        deleted: false,
        doctor: {
          id,
        },
      },
    });

    if (availabilities.length) {
      availabilities.map((item) => (item.deleted = true));
      await this.repository.save(availabilities);
    }
    console.log('SOFT DELETION: AVAILABILITES BY DOCTOR');

    return true;
  }
}
