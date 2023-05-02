import {
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

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private repository: Repository<Availability>
  ) {}

  async findAll(): Promise<ResponseAvailabilityDto[]> {
    const data = await this.repository.find({
      where: {
        deleted: false,
      },
      relations: {
        doctor: true,
      },
      order: {
        date: 'ASC',
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
        doctor: true,
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
    try {
      const availability = this.repository.create({
        time: createAvailabilityDto.time,
        date: new Date(createAvailabilityDto.date).toLocaleDateString(),
        available: createAvailabilityDto.available,
        doctor: {
          id: createAvailabilityDto.doctorId,
        },
      });
      return new ResponseAvailabilityDto(
        await this.repository.save(availability)
      );
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
    try {
      const availability = await this.repository.save({
        time: updateAvailabilityDto.time,
        date: new Date(updateAvailabilityDto.date).toLocaleDateString(),
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
          doctor: true,
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
}
