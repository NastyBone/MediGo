import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { PatientMemoryService } from '../../memory';
import { PatientVM, PatientItemVM } from '../../model';
import { PatientItem2PatientItemVM } from '../../mappers';
import { PatientService } from '@medigo/dashboard-sdk';

@Injectable()
export class CreatePatientService {
  constructor(
    private patientService: PatientService,
    private memoryService: PatientMemoryService
  ) {}

  exec(PatientSave: PatientVM): Observable<PatientItemVM | null> {
    return this.patientService.patientControllerCreate(PatientSave).pipe(
      map(PatientItem2PatientItemVM),
      tap((patient) => this.memoryService.create(patient))
    );
  }
}
