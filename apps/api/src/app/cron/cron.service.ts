import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ResponseCiteDto } from '../repositories/cite/dto';
import { socketOptions } from './constants';

@WebSocketGateway(+process.env.GATEWAY_PORT | 8080, socketOptions)
@Injectable()
export class CronService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  @WebSocketServer() server: Server;

  setCronJob(cite: ResponseCiteDto): void {
    console.log('Cite!');
    const job = new CronJob(this.formatDate(cite.date, cite.time), () => {
      this.server.emit('alert', {
        data: cite,
      });
      console.log('Emitting: ' + cite.date);
    });
    this.schedulerRegistry.addCronJob('' + cite.id, job);
    job.start();
  }

  deleteCronJob(id: string): void {
    this.schedulerRegistry.deleteCronJob('' + id);
  }

  updateCronJob(cite: ResponseCiteDto): void {
    this.deleteCronJob('' + cite.id);
    this.setCronJob(cite);
  }

  deleteManyCronJobs(cites: ResponseCiteDto[]): void {
    cites.forEach((cite) => {
      this.deleteCronJob('' + cite.id);
    });
  }

  test(): void {
    const myDate = new Date(new Date(Date.now() + 5000));
    console.log(myDate);
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

  formatDate(_date: string, _time: string): Date {
    const date = new Date(_date);
    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(date.getDate() - 1);
    const [hours, minutes] = _time.split(':');
    yesterday.setHours(+hours);
    yesterday.setMinutes(+minutes);

    return yesterday;
  }
}
