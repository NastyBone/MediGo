import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { AvailabilityItem2AvailabilityItemVM } from '../../mappers';
import { AvailabilityMemoryService } from '../../memory';
import { AvailabilityVM, AvailabilityItemVM } from '../../model';
import { AvailabilityService } from '@medigo/dashboard-sdk';

@Injectable()
export class CreateAvailabilityService {
  constructor(
    private availabilityService: AvailabilityService,
    private memoryService: AvailabilityMemoryService
  ) {}

  exec(
    AvailabilitySave: AvailabilityVM
  ): Observable<AvailabilityItemVM | null> {
    return this.availabilityService
      .availabilityControllerCreate(AvailabilitySave)
      .pipe(
        map(AvailabilityItem2AvailabilityItemVM),
        tap((availability) => this.memoryService.create(availability))
      );
  }
}
