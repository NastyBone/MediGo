import { Injectable } from '@angular/core';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { AvailabilityItem2AvailabilityItemVM } from '../../mappers';
import { AvailabilityItemVM } from '../../model';
import { AvailabilityService } from '@medigo/dashboard-sdk';

@Injectable()
export class FindAvailabilityService
  implements UseCase<AvailabilityItemVM | null, BaseQuery>
{
  constructor(private availabilityService: AvailabilityService) {}

  exec(data: BaseQuery): Observable<AvailabilityItemVM | null> {
    return this.availabilityService
      .availabilityControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(AvailabilityItem2AvailabilityItemVM));
  }
}
