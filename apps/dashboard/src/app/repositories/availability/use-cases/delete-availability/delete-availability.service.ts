import { Injectable } from '@angular/core';
import { AvailabilityService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { AvailabilityMemoryService } from '../../memory';

@Injectable()
export class DeleteAvailabilityService implements UseCase<number, number> {
  constructor(
    private availabilityService: AvailabilityService,
    private memoryService: AvailabilityMemoryService
  ) {}

  exec(id: number): Observable<number> {
    return this.availabilityService.availabilityControllerRemove(id).pipe(
      map(() => 1),
      tap(() => {
        this.memoryService.delete(id);
      })
    );
  }
}
