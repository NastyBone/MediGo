import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ResponseCiteDto } from '../repositories/cite/dto';

@WebSocketGateway()
@Injectable()
export class CronService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  @WebSocketServer() server: Server;

  setCronJob(cite: ResponseCiteDto): void {
    console.log('Cite!');
    const job = new CronJob(cite.date, () => {
      this.server.emit('alert', `Cita: ${cite.time}`); //FIXME: Improve message
      console.log('Emitting: ' + cite.date);
    });
    this.schedulerRegistry.addCronJob('' + cite.id, job);
    job.start();
  }

  test(): void {
    console.log('Cite!');
    const myDate = new Date(Date.now() + 5000);
    const job = new CronJob(myDate, () => {
      if (this.server) {
        this.server.emit('alert', `Cita: ${myDate}`);
        console.log('Emitting test: ' + myDate);
      } else {
        console.log('server error');
      }
    });
    this.schedulerRegistry.addCronJob('' + 'test', job);
    job.start();
  }
  // delete a job
  // delete array of jobs
  // update a job

  //FIXME: Eliminar cuando funcione correctamente
}
