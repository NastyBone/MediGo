import { Injectable } from '@angular/core';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Availability2AvailabilityVM } from '../../mappers';
import { AvailabilityVM } from '../../model';
import { AvailabilityService } from '@medigo/dashboard-sdk';

@Injectable()
export class FindAvailabilityService
  implements UseCase<AvailabilityVM | null, BaseQuery>
{
  constructor(private availabilityService: AvailabilityService) {}

  exec(data: BaseQuery): Observable<AvailabilityVM | null> {
    return this.availabilityService
      .availabilityControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(Availability2AvailabilityVM));
  }
}
