import { Injectable } from '@angular/core';
import { UserStateService } from '../user-state';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertSocketService {
  constructor(private userStateService: UserStateService) { }
  private socket = io('http://localhost:8080', {
    withCredentials: true,
    extraHeaders: {
      'Access-Control-Allow-Credentials': 'true',
    },
  });

  getMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('alert', (data: any) => {
        if (this.checkRole(data)) {
          observer.next(data);
        }
      });
    });
  }

  checkRole(data: any): boolean {
    const fullRole = this.userStateService.getFullRole();
    const role = this.userStateService.getRole();
    if (role == 'administrador') return true;

    if (role == 'asistente') {
      if (data.doctor.id == fullRole.doctor.id) {
        return true;
      }
    }
    if (role == 'paciente') {
      if (data.patient.id == fullRole.id) {
        return true;
      }
    }
    if (role == 'doctor') {
      if (data.doctor.id == fullRole.id) {
        return true;
      }
    }

    return false;
  }
}
