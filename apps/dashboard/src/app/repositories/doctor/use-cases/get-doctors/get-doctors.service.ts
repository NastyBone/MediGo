import { Injectable } from '@angular/core';
import { DoctorService } from '@medigo/dashboard-sdk';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { DoctorMemoryService } from '../../memory';
import { DoctorItemVM } from '../../model';
import { Doctor2DoctorItemVM } from '../../mappers';

@Injectable()
export class GetDoctorsService
  implements UseCase<Array<DoctorItemVM> | null, BaseQuery>
{
  constructor(
    private doctorsService: DoctorService,
    private memoryService: DoctorMemoryService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(data: BaseQuery): Observable<Array<DoctorItemVM> | null> {
    return this.doctorsService.doctorControllerFindAll().pipe(
      map((res) => res.map(Doctor2DoctorItemVM)),
      tap((Doctor: DoctorItemVM[]) => {
        this.memoryService.setDataSource(Doctor);
      })
    );
  }
}
