import { Injectable } from '@angular/core';
import { PatientService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { PatientItem2PatientItemVM } from '../../mappers';
import { PatientItemVM } from '../../model';

@Injectable()
export class FindPatientByUserIdService {
  constructor(private patientService: PatientService) {}

  exec(data: BaseQuery): Observable<PatientItemVM> {
    return this.patientService
      .patientControllerFindByUserId(data?.id || 0) //ERROR
      .pipe(map(PatientItem2PatientItemVM));
  }
}
