import { Injectable } from '@angular/core';
import { DoctorService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Doctor2DoctorItemVM } from '../../mappers';
import { DoctorItemVM } from '../../model';

@Injectable()
export class FindDoctorByUserIdService {
  constructor(private doctorService: DoctorService) {}

  exec(data: BaseQuery): Observable<DoctorItemVM> {
    return this.doctorService
      .doctorControllerFindByUserId(data?.id || 0) //ERROR
      .pipe(map(Doctor2DoctorItemVM));
  }
}
