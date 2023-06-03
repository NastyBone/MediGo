import { Injectable } from '@angular/core';
import { PatientService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Patient2PatientVM } from '../../../patient/mappers';
import { PatientVM } from '../../../patient/model';

@Injectable()
export class FindPatientByUserIdService {
  constructor(private patientService: PatientService) {}

  exec(data: BaseQuery): Observable<PatientVM | null> {
    return this.patientService
      .patientControllerFindByUserId(data?.id || 0) //ERROR
      .pipe(map(Patient2PatientVM));
  }
}
