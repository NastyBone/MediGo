import { Injectable } from '@angular/core';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { AvailabilityItem2AvailabilityItemVM } from '../../mappers';
import { AvailabilityItemVM } from '../../model';
import { AvailabilityMemoryService } from '../../memory';

@Injectable()
export class GetAvailabilitiesService
  implements UseCase<Array<AvailabilityItemVM> | null, BaseQuery>
{
  constructor(
    private availabilitysService: AvailabilityService,
    private memoryService: AvailabilityMemoryService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(data: BaseQuery): Observable<Array<AvailabilityItemVM> | null> {
    return this.availabilitysService.availabilityControllerFindAll().pipe(
      map((res) => res.map(AvailabilityItem2AvailabilityItemVM)),
      tap((Availability: AvailabilityItemVM[]) => {
        this.memoryService.setDataSource(Availability);
      })
    );
  }
}
