import { Injectable } from '@angular/core';
import { PatientService } from '@medigo/dashboard-sdk';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { PatientItem2PatientItemVM } from '../../mappers';
import { PatientMemoryService } from '../../memory';
import { PatientItemVM } from '../../model';

@Injectable()
export class GetPatientsService
  implements UseCase<Array<PatientItemVM> | null, BaseQuery>
{
  constructor(
    private patientService: PatientService,
    private memoryService: PatientMemoryService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(data: BaseQuery): Observable<Array<PatientItemVM> | null> {
    return this.patientService.patientControllerFindAll().pipe(
      map((res) => res.map(PatientItem2PatientItemVM)),
      tap((Patient: PatientItemVM[]) => {
        this.memoryService.setDataSource(Patient);
      })
    );
  }
}
