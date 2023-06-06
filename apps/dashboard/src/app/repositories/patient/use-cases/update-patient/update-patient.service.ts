import { Injectable } from '@angular/core';
import { PatientService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { PatientItem2PatientItemVM } from '../../mappers';
import { PatientMemoryService } from '../../memory';
import { PatientItemVM, PatientVM } from '../../model';

@Injectable()
export class UpdatePatientService
  implements UseCase<PatientItemVM | null, PatientVM>
{
  constructor(
    private patientService: PatientService,
    private memoryService: PatientMemoryService
  ) {}

  exec(patientSave: PatientVM): Observable<PatientItemVM | null> {
    return this.patientService
      .patientControllerUpdate(patientSave, patientSave.id || 0)
      .pipe(
        map(PatientItem2PatientItemVM),
        tap((patient: PatientItemVM) => {
          this.memoryService.update(patient);
        })
      );
  }
}
