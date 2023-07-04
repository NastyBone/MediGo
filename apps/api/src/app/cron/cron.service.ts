import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ResponseCiteDto } from '../repositories/cite/dto';
import { socketOptions } from './constants';
import {
  timeStringToDate,
  formatDate,
} from '@medigo/time-handler';

@WebSocketGateway(+process.env.GATEWAY_PORT | 8080, socketOptions)
@Injectable()
export class CronService {
  constructor(private schedulerRegistry: SchedulerRegistry) { }
  @WebSocketServer() server: Server;

  setCronJob(
    id: number,
    date: string,
    time: string,
    doctor: { id: number; name: string },
    patient: { id: number; name: string },
    speciality: string
  ): void {
    const alertDate = timeStringToDate(formatDate(date), time, false);
    // const myDate = new Date(new Date(Date.now() + 4000));

    const job = new CronJob(
      alertDate,
      () => {
        console.log('Emitting: ' + alertDate);

        this.server.emit('alert', {
          date,
          time,
          doctor,
          patient,
          speciality,
        });
      }
    );
    this.schedulerRegistry.addCronJob(id + '', job);
    job.start();
  }

  deleteCronJob(id: number): void {
    const job = this.getCronJob(id);
    if (job) {
      this.schedulerRegistry.deleteCronJob('' + id);
    }
  }

  updateCronJob(
    id: number,
    date: string,
    time: string,
    doctor: { id: number; name: string },
    patient: { id: number; name: string },
    speciality: string
  ): void {
    const job = this.getCronJob(id);
    if (job) {
      this.deleteCronJob(id);
    }
    this.setCronJob(id, date, time, doctor, patient, speciality);
  }

  pauseJob(id: number): void {
    const job = this.getCronJob(id);
    if (job) {
      job.stop();
    }
  }

  startJob(id: number): void {
    const job = this.getCronJob(id);
    if (job) {
      job.start();
    }
  }

  deleteManyCronJobs(cites: ResponseCiteDto[]): void {
    try {
      cites.forEach((cite) => {
        this.deleteCronJob(cite.id);
      });
    } catch (e) {
      console.log();
    }
  }

  getCronJob(id: number): CronJob {
    let job = null;
    try {
      job = this.schedulerRegistry.getCronJob('' + id);
    } catch (e) {
      console.log();
    }
    return job;
  }

  test(): void {
    const myDate = new Date(new Date(Date.now() + 5000));
    const job = new CronJob(myDate, () => {
      if (this.server) {
        this.server.emit('alert', `Cita: ${myDate}`);
        console.log('Emitting test: ' + myDate);
      } else {
        console.log('Server error');
      }
    });
    this.schedulerRegistry.addCronJob('' + 'test', job);
    job.start();
  }
}
