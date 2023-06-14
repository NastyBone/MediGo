import { Injectable } from '@angular/core';
import { UserStateService } from '../user-state';
import { ToastService } from '@medigo/toast';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ResponseCiteDto } from '@medigo/dashboard-sdk';

@Injectable({
  providedIn: 'root',
})
export class AlertSocketService {
  private socket = io('http://localhost:8080', {
    withCredentials: true,
    extraHeaders: {
      'Access-Control-Allow-Credentials': 'true',
    },
  });

  constructor() {
    return;
  }

  getMessage(): Observable<ResponseCiteDto> {
    return new Observable((observer) => {
      this.socket.on('alert', (data: ResponseCiteDto) => {
        observer.next(data);
      });
    });
  }
}
