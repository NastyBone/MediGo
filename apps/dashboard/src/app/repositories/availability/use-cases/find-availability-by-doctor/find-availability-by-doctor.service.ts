import { Injectable } from '@angular/core';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { AvailabilityItem2AvailabilityItemVM } from '../../mappers';
import { AvailabilityItemVM } from '../../model';

@Injectable()
export class FindAvailabilityByDoctorService {
  constructor(private availabilityService: AvailabilityService) {}

  exec(data: BaseQuery): Observable<AvailabilityItemVM> {
    return this.availabilityService
      .availabilityControllerFindByDoctor(data?.id || 0) //ERROR
      .pipe(map(AvailabilityItem2AvailabilityItemVM));
  }
}
