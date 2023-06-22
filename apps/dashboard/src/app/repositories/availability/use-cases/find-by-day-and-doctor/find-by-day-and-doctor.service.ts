import { Injectable } from '@angular/core';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { Observable, map } from 'rxjs';
import { AvailabilityItem2AvailabilityItemVM } from '../../mappers';
import { AvailabilityItemVM } from '../../model';

@Injectable()
export class FindByDayAndDoctorService {
  constructor(private availabilityService: AvailabilityService) {}

  exec(data: any): Observable<AvailabilityItemVM[]> {
    return this.availabilityService
      .availabilityControllerFindByDay({ date: data.date }, data.id || 0) //ERROR
      .pipe(map((res) => res.map(AvailabilityItem2AvailabilityItemVM)));
  }
}
