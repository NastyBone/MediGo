import { Injectable } from '@angular/core';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Availability2AvailabilityVM } from '../../mappers';
import { AvailabilityVM } from '../../model';

@Injectable()
export class FindAvailabilityByDoctorService {
  constructor(private availabilityService: AvailabilityService) {}

  exec(data: BaseQuery): Observable<AvailabilityVM | null> {
    return this.availabilityService
      .availabilityControllerFindByDoctor(data?.id || 0) //ERROR
      .pipe(map(Availability2AvailabilityVM));
  }
}
