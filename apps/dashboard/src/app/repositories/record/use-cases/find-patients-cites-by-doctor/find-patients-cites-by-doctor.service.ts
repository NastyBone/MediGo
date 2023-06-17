import { Injectable } from '@angular/core';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { CiteService } from '@medigo/dashboard-sdk';
import { PatientItemVM } from '../../../patient/model';
import { CiteItem2PatientItemVM } from '../../mappers/cite-2-patient-item-vm';

@Injectable()
export class FindPatientsCitesByDoctorService {
  constructor(private citeService: CiteService) {}

  exec(data: BaseQuery): Observable<PatientItemVM[]> {
    return this.citeService
      .citeControllerFindByDoctor(data?.id || 0) //ERROR
      .pipe(
        map((res) => {
          //TODO: Testear con citas
          return res.map(CiteItem2PatientItemVM);
        })
      );
  }
}
