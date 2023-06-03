import { Injectable } from '@angular/core';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { AvailabilityItem2AvailabilityItemVM } from '../../mappers';
import { AvailabilityMemoryService } from '../../memory';
import { AvailabilityItemVM, AvailabilityVM } from '../../model';

@Injectable()
export class UpdateAvailabilityService
  implements UseCase<AvailabilityItemVM | null, AvailabilityVM>
{
  constructor(
    private availabilityService: AvailabilityService,
    private memoryService: AvailabilityMemoryService
  ) {}

  exec(
    availabilitySave: AvailabilityVM
  ): Observable<AvailabilityItemVM | null> {
    return this.availabilityService
      .availabilityControllerUpdate(availabilitySave, availabilitySave.id || 0)
      .pipe(
        map(AvailabilityItem2AvailabilityItemVM),
        tap((availability: AvailabilityItemVM) => {
          this.memoryService.update(availability);
        })
      );
  }
}
