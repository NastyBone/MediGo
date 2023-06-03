import { Injectable } from '@angular/core';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Speciality2SpecialityVM } from '../../mappers';
import { SpecialityVM } from '../../model';
import { SpecialityService } from '@medigo/dashboard-sdk';

@Injectable()
export class FindSpecialityService
  implements UseCase<SpecialityVM | null, BaseQuery>
{
  constructor(private specialityService: SpecialityService) {}

  exec(data: BaseQuery): Observable<SpecialityVM | null> {
    return this.specialityService
      .specialityControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(Speciality2SpecialityVM));
  }
}
