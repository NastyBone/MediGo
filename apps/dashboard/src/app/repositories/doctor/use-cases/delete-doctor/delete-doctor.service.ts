import { Injectable } from '@angular/core';
import { DoctorService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { DoctorMemoryService } from '../../memory';

@Injectable()
export class DeleteDoctorService implements UseCase<number, number> {
  constructor(
    private doctorService: DoctorService,
    private memoryService: DoctorMemoryService
  ) {}

  exec(id: number): Observable<number> {
    return this.doctorService.doctorControllerRemove(id).pipe(
      map(() => 1),
      tap(() => {
        this.memoryService.delete(id);
      })
    );
  }
}
