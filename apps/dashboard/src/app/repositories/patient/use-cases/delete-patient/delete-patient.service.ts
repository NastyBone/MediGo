import { Injectable } from '@angular/core';
import { PatientService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { PatientMemoryService } from '../../memory';

@Injectable()
export class DeletePatientService implements UseCase<number, number> {
  constructor(
    private patientService: PatientService,
    private memoryService: PatientMemoryService
  ) {}

  exec(id: number): Observable<number> {
    return this.patientService.patientControllerRemove(id).pipe(
      map(() => 1),
      tap(() => {
        this.memoryService.delete(id);
      })
    );
  }
}
