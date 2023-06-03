import { Injectable } from '@angular/core';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Patient2PatientVM } from '../../mappers';
import { PatientVM } from '../../model';
import { PatientService } from '@medigo/dashboard-sdk';

@Injectable()
export class FindPatientService
  implements UseCase<PatientVM | null, BaseQuery>
{
  constructor(private patientService: PatientService) {}

  exec(data: BaseQuery): Observable<PatientVM | null> {
    return this.patientService
      .patientControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(Patient2PatientVM));
  }
}
