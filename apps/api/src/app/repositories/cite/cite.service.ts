import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Cite } from './entities';
import { CreateCiteDto, ResponseCiteDto, UpdateCiteDto } from './dto';
import { CronService } from '../../cron/cron.service';

@Injectable()
export class CiteService {
  constructor(
    @InjectRepository(Cite)
    private repository: Repository<Cite>,
    private cronService: CronService
  ) {}

  async findAll(): Promise<ResponseCiteDto[]> {
    this.testCronJob();
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

    return data.map((item) => new ResponseCiteDto(item));
  }

  async findValid(id: number): Promise<Cite> {
    const data = this.repository.findOne({
      where: {
        id,
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
    if (!data) {
      throw new NotFoundException('Cita no encontrada.');
    }
    return data;
  }

  async findOne(id: number): Promise<ResponseCiteDto> {
    const cite = await this.findValid(id);
    return new ResponseCiteDto(cite);
  }
  async insert(createCiteDto: CreateCiteDto): Promise<ResponseCiteDto> {
    try {
      if (new Date(createCiteDto.date).getDate() < Date.now()) {
        throw new BadRequestException('Fecha Invalida');
      }
      const cite = this.repository.create({
        subject: createCiteDto.subject,
        date: new Date(createCiteDto.date).toLocaleDateString(),
        time: createCiteDto.time,
        patientConfirm: createCiteDto.patientConfirm,
        doctor: {
          id: createCiteDto.doctorId,
        },
        patient: {
          id: createCiteDto.patientId,
        },
      });

      //ADD CRON JOB
      //this.cronService.setCronJob(cite);

      return new ResponseCiteDto(await this.repository.save(cite));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al registrar cita');
    }
  }
  async update(
    id: number,
    updateCiteDto: UpdateCiteDto
  ): Promise<ResponseCiteDto> {
    await this.findValid(id);
    try {
      if (new Date(updateCiteDto.date).getDate() < Date.now()) {
        throw new BadRequestException('Fecha Invalida');
      }
      const cite = await this.repository.save({
        subject: updateCiteDto.subject,
        date: new Date(updateCiteDto.date).toLocaleDateString(),
        time: updateCiteDto.time,
        patientConfirm: updateCiteDto.patientConfirm,
        doctor: {
          id: updateCiteDto.doctorId,
        },
        patient: {
          id: updateCiteDto.patientId,
        },
      });
      return this.findOne(cite.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al modificar cita');
    }
  }
  async remove(id: number): Promise<ResponseCiteDto> {
    try {
      const cite = await this.findValid(id);
      cite.deleted = true;
      return new ResponseCiteDto(await this.repository.save(cite));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al eliminar cita');
    }
  }
  async findByPatient(id: number): Promise<ResponseCiteDto[]> {
    try {
      const cite = await this.repository.find({
        where: {
          patient: {
            id,
          },
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
      return cite.map((item) => new ResponseCiteDto(item));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al encontrar citas');
    }
  }

  async findByDoctor(id: number): Promise<ResponseCiteDto[]> {
    try {
      const cite = await this.repository.find({
        where: {
          doctor: {
            id,
          },
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
      return cite.map((item) => new ResponseCiteDto(item));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al encontrar citas');
    }
  }

  async toggleCite(id: number): Promise<ResponseCiteDto> {
    const cite = await this.repository.findOne({
      where: {
        deleted: false,
        id,
      },
    });
    cite.patientConfirm = !cite.patientConfirm;

    await this.repository.save(cite);
    return this.findOne(id);
  }

  async getData(): Promise<{ completed: number; notCompleted: number }> {
    const now = new Date(); // obtener la fecha y hora actual
    const presentMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDay(),
      0,
      0,
      0,
      0
    ).toLocaleDateString();
    const prevMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDay(),
      0,
      0,
      0,
      0
    ).toLocaleDateString();
    const countCompleted = await this.repository.count({
      where: {
        deleted: false,
        patientConfirm: true,
        date: Between(prevMonth, presentMonth),
      },
    });

    const countNotCompleted = await this.repository.count({
      where: {
        deleted: false,
        patientConfirm: false,
        date: Between(prevMonth, presentMonth),
      },
    });
    return { completed: countCompleted, notCompleted: countNotCompleted };
  }

  async getDataByDoctor(
    id: number
  ): Promise<{ completed: number; notCompleted: number }> {
    const countCompleted = await this.repository.count({
      where: {
        deleted: false,
        patientConfirm: true,
        doctor: {
          id,
        },
      },
    });

    const countNotCompleted = await this.repository.count({
      where: {
        deleted: false,
        patientConfirm: false,
        doctor: {
          id,
        },
      },
    });
    return { completed: countCompleted, notCompleted: countNotCompleted };
  }

  testCronJob(): string {
    this.cronService.test();
    return 'Send!';
  }
}
