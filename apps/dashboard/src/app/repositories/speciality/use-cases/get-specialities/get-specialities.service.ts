import { Injectable } from '@angular/core';
import { SpecialityService } from '@medigo/dashboard-sdk';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { SpecialityItem2SpecialityItemVM } from '../../mappers';
import { SpecialityMemoryService } from '../../memory';
import { SpecialityItemVM } from '../../model';

@Injectable()
export class GetSpecialitiesService
  implements UseCase<Array<SpecialityItemVM> | null, BaseQuery>
{
  constructor(
    private specialitysService: SpecialityService,
    private memoryService: SpecialityMemoryService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(data: BaseQuery): Observable<Array<SpecialityItemVM> | null> {
    return this.specialitysService.specialityControllerFindAll().pipe(
      map((res) => res.map(SpecialityItem2SpecialityItemVM)),
      tap((Speciality: SpecialityItemVM[]) => {
        this.memoryService.setDataSource(Speciality);
      })
    );
  }
}
