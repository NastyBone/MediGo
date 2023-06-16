import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ResponseCiteDto } from '../repositories/cite/dto';
import { socketOptions } from './constants';
import { timeStringToDate, checkTimeRange } from '@medigo/time-handler';

@WebSocketGateway(+process.env.GATEWAY_PORT | 8080, socketOptions)
@Injectable()
export class CronService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  @WebSocketServer() server: Server;

  setCronJob(cite: ResponseCiteDto): void {
    const job = new CronJob(
      timeStringToDate(cite.date, cite.time, true),
      () => {
        this.server.emit('alert', {
          data: cite,
        });
      }
    );
    this.schedulerRegistry.addCronJob('' + cite.id, job);
  }

  deleteCronJob(id: string): void {
    this.schedulerRegistry.deleteCronJob('' + id);
  }

  updateCronJob(cite: ResponseCiteDto): void {
    this.deleteCronJob('' + cite.id);
    this.setCronJob(cite);
  }

  pauseJob(id: number): void {
    const job = this.schedulerRegistry.getCronJob('' + id);
    job.stop();
  }

  startJob(id: number): void {
    const job = this.schedulerRegistry.getCronJob('' + id);
    job.start();
  }

  deleteManyCronJobs(cites: ResponseCiteDto[]): void {
    cites.forEach((cite) => {
      this.deleteCronJob('' + cite.id);
    });
  }

  test(): void {
    checkTimeRange('10:00 AM', '10:01 AM');

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
