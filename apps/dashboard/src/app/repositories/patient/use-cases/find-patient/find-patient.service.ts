import { Injectable } from '@angular/core';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Patient2PatientVM, PatientItem2PatientItemVM } from '../../mappers';
import { PatientItemVM, PatientVM } from '../../model';
import { PatientService } from '@medigo/dashboard-sdk';

@Injectable()
export class FindPatientService
  implements UseCase<PatientItemVM | null, BaseQuery>
{
  constructor(private patientService: PatientService) {}

  exec(data: BaseQuery): Observable<PatientItemVM | null> {
    return this.patientService
      .patientControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(PatientItem2PatientItemVM));
  }
}
