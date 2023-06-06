import { Injectable } from '@angular/core';
import { SpecialityService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { SpecialityMemoryService } from '../../memory';

@Injectable()
export class DeleteSpecialityService implements UseCase<number, number> {
  constructor(
    private specialityService: SpecialityService,
    private memoryService: SpecialityMemoryService
  ) {}

  exec(id: number): Observable<number> {
    return this.specialityService.specialityControllerRemove(id).pipe(
      map(() => 1),
      tap(() => {
        this.memoryService.delete(id);
      })
    );
  }
}
