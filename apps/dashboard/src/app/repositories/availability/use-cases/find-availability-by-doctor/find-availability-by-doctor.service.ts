import { Injectable } from '@angular/core';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { AvailabilityItem2AvailabilityItemVM } from '../../mappers';
import { AvailabilityItemVM } from '../../model';
import { AvailabilityMemoryService } from '../../memory';

@Injectable()
export class FindAvailabilityByDoctorService {
  constructor(
    private availabilityService: AvailabilityService,
    private memoryService: AvailabilityMemoryService
  ) {}

  exec(data: BaseQuery): Observable<AvailabilityItemVM[]> {
    return this.availabilityService
      .availabilityControllerFindByDoctor(data?.id || 0) //ERROR
      .pipe(
        map((res) => res.map(AvailabilityItem2AvailabilityItemVM)),
        tap((Record: AvailabilityItemVM[]) => {
          this.memoryService.setDataSource(Record);
        })
      );
  }
}
//suri tamos jodios
