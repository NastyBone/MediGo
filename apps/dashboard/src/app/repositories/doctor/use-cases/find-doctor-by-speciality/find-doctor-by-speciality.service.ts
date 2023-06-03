import { Injectable } from '@angular/core';
import { DoctorService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Doctor2DoctorItemVM, Doctor2DoctorVM } from '../../mappers';
import { DoctorItemVM, DoctorVM } from '../../model';

@Injectable()
export class FindDoctorBySpecialityService {
  constructor(private doctorService: DoctorService) {}

  exec(data: BaseQuery): Observable<DoctorItemVM> {
    return this.doctorService
      .doctorControllerFindBySpecialityId(data?.id || 0) //ERROR
      .pipe(map(Doctor2DoctorItemVM));
  }
}
