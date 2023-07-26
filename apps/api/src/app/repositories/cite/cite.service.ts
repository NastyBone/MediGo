import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Cite } from './entities';
import { CiteReportDto, CreateCiteDto, ResponseCiteDto, UpdateCiteDto } from './dto';
import { CronService } from '../../cron/cron.service';
import {
  getMonthRange,
  timeStringToDate,
  validateDatesRange
} from '@medigo/time-handler';
import { ReportsService } from '../../reports/reports.service';
import { ReportsResponseDto } from '../../reports/dto';

@Injectable()
export class CiteService {
  constructor(
    @InjectRepository(Cite)
    private repository: Repository<Cite>,
    private cronService: CronService,
    private reportService: ReportsService
  ) { }

  async findAll(): Promise<ResponseCiteDto[]> {
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
        time: {
          doctor: {
            speciality: true,
            user: true,
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
        patient: {
          user: true,
        },
        doctor: {
          speciality: true,
          user: true,
        },
        time: {
          doctor: {
            speciality: true,
            user: true,
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
      const now = timeStringToDate(
        new Date(createCiteDto.date).toLocaleDateString('es-ES'),
        createCiteDto.time.start
      );
      if (now < new Date()) {
        throw new BadRequestException('Fecha Excedida');
      }
      const cite = this.repository.create({
        subject: createCiteDto.subject,
        date: new Date(createCiteDto.date).toLocaleDateString('es-ES'),
        time: {
          id: createCiteDto.timeId,
        },
        patientConfirm: createCiteDto.patientConfirm,
        doctor: {
          id: createCiteDto.doctorId,
        },
        patient: {
          id: createCiteDto.patientId,
        },
      });

      //CRON
      const newCite = await this.repository.save(cite);
      this.cronService.updateCronJob(
        createCiteDto.id,
        createCiteDto.date,
        createCiteDto.time.start,
        {
          id: createCiteDto.doctor.id,
          name:
            createCiteDto.doctor.user.firstName +
            ' ' +
            createCiteDto.doctor.user.lastName,
        },
        {
          id: createCiteDto.patient.id,
          name:
            createCiteDto.patient.user.firstName +
            ' ' +
            createCiteDto.patient.user.lastName,
        },
        createCiteDto.doctor.speciality.name
      );
      if (newCite.patientConfirm) {
        this.cronService.startJob(newCite.id);
      } else {
        this.cronService.pauseJob(newCite.id);
      }
      return this.findOne(newCite.id);
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
      const now = timeStringToDate(
        new Date(updateCiteDto.date).toLocaleDateString('es-ES'),
        updateCiteDto.time.start
      );
      if (now < new Date()) {
        throw new BadRequestException('Fecha Excedida');
      }
      const cite = await this.repository.save({
        id,
        subject: updateCiteDto.subject,
        date: new Date(updateCiteDto.date).toLocaleDateString('es-ES'),
        time: {
          id: updateCiteDto.timeId,
        },
        patientConfirm: updateCiteDto.patientConfirm,
        doctor: {
          id: updateCiteDto.doctorId,
        },
        patient: {
          id: updateCiteDto.patientId,
        },
      });

      //CRON
      this.cronService.updateCronJob(
        updateCiteDto.id,
        updateCiteDto.date,
        updateCiteDto.time.start,
        {
          id: updateCiteDto.doctor.id,
          name:
            updateCiteDto.doctor.user.firstName +
            ' ' +
            updateCiteDto.doctor.user.lastName,
        },
        {
          id: updateCiteDto.patient.id,
          name:
            updateCiteDto.patient.user.firstName +
            ' ' +
            updateCiteDto.patient.user.lastName,
        },
        updateCiteDto.doctor.speciality.name
      );
      if (cite.patientConfirm) {
        this.cronService.startJob(cite.id);
      } else {
        this.cronService.pauseJob(cite.id);
      }

      return this.findOne(cite.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al modificar cita');
    }
  }
  async remove(id: number): Promise<ResponseCiteDto> {
    //CRON
    try {
      this.cronService.deleteCronJob(id);
    } catch (e) {
      console.log();
    }
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
          patient: {
            user: true,
          },
          doctor: {
            speciality: true,
            user: true,
          },
          time: {
            doctor: {
              speciality: true,
              user: true,
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
          patient: {
            user: true,
          },
          doctor: {
            speciality: true,
            user: true,
          },
          time: {
            doctor: {
              speciality: true,
              user: true,
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

  async findByDoctorAndDate(
    doctor_id: number,
    objectDate: { date: string }
  ): Promise<ResponseCiteDto[]> {
    try {
      const cites = await this.repository.find({
        where: {
          deleted: false,
          date: new Date(objectDate.date).toLocaleDateString('es-ES'),
          doctor: {
            id: doctor_id,
          },
        },
        relations: {
          patient: {
            user: true,
          },

          doctor: {
            speciality: true,
            user: true,
          },
          time: {
            doctor: {
              speciality: true,
              user: true,
            },
          },
        },
      });
      return cites.map((cite) => new ResponseCiteDto(cite));
    } catch (e) {
      throw new InternalServerErrorException('Error al encontrar cita');
    }
  }

  async getData(id: number): Promise<{ completed: number; notCompleted: number }> {
    const [presentMonth, prevMonth] = getMonthRange(id);
    console.log(presentMonth, prevMonth)
    const countCompleted = await this.repository.count({
      where: {
        deleted: false,
        patientConfirm: true,
        createdAt: Between(prevMonth, presentMonth),
      },
    });


    const countNotCompleted = await this.repository.count({
      where: {
        deleted: false,
        patientConfirm: false,
        createdAt: Between(prevMonth, presentMonth),
      },
    });
    return { completed: countCompleted, notCompleted: countNotCompleted };
  }

  async getDataByRange(date: { start: string, end: string }): Promise<{ id: number, name: string, count: string }[]> {

    date = validateDatesRange(date.start, date.end)
    const result = this.repository.createQueryBuilder("cite")
      .innerJoinAndSelect("cite.doctor", "doctor")
      .innerJoinAndSelect("doctor.speciality", "speciality")
      .select("speciality.id, speciality.name, COUNT(cite.id)", "count")
      .where("cite.createdAt BETWEEN :start AND :end", { start: date.start, end: date.end })
      .groupBy("speciality.id")
      .getRawMany();

    return result
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

  async deleteByPatients(id: number): Promise<void | boolean> {
    const cites = await this.repository.find({
      where: {
        deleted: false,
        patient: {
          id,
        },
      },
    });

    if (cites.length) {
      this.cronService.deleteManyCronJobs(cites);
      cites.map((item) => (item.deleted = true));
      await this.repository.save(cites);
    }

    console.log('SOFT DELETION: CITES BY PATIENT');
    return true;
  }

  async deleteByDoctors(id: number): Promise<void | boolean> {
    const cites = await this.repository.find({
      where: {
        deleted: false,
        doctor: {
          id,
        },
      },
    });
    if (cites.length) {
      this.cronService.deleteManyCronJobs(cites);
      cites.map((item) => (item.deleted = true));
      await this.repository.save(cites);
    }
    console.log('SOFT DELETION: CITES BY DOCTOR');
    return true;
  }

  async deleteByAvailability(id: number): Promise<void | boolean> {
    const cites = await this.repository.find({
      where: {
        deleted: false,
        time: {
          id,
        },
      },
    });
    if (cites.length) {
      this.cronService.deleteManyCronJobs(cites);
      cites.map((item) => (item.deleted = true));
      await this.repository.save(cites);
    }
    console.log('SOFT DELETION: CITES BY TIME');
    return true;
  }

  async generateReport(createReport: CiteReportDto): Promise<ReportsResponseDto> {
    const date = validateDatesRange(createReport.start, createReport.end)
    const filters = {
      deleted: false,
      createdAt: Between(new Date(date.start), new Date(date.end))
    }

    if (createReport.status !== null) {
      filters['status'] = createReport.status
    }
    if (createReport.patientId !== null) {
      filters['patient'] = { id: createReport.patientId }
    }
    if (createReport.doctorId !== null) {
      filters['doctor'] = { id: createReport.doctorId }
    }

    const cites = await this.repository.find({
      where: filters,
      relations: {
        patient: {
          user: true,
        },

        doctor: {
          speciality: true,
          user: true,
        },
        time: {
          doctor: {
            speciality: true,
            user: true,
          },
        },
      },
    })
    const response = this.reportService.generateReport({ data: cites }, 'Citas')
    return response
  }
}
