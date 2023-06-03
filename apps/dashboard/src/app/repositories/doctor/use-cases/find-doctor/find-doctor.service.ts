import { Injectable } from '@angular/core';
import { DoctorService } from '@medigo/dashboard-sdk';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Doctor2DoctorItemVM } from '../../mappers';
import { DoctorItemVM } from '../../model';

@Injectable()
export class FindDoctorService
  implements UseCase<DoctorItemVM | null, BaseQuery>
{
  constructor(private doctorService: DoctorService) {}

  exec(data: BaseQuery): Observable<DoctorItemVM | null> {
    return this.doctorService
      .doctorControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(Doctor2DoctorItemVM));
  }
}
