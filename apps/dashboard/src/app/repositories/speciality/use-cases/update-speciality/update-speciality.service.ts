import { Injectable } from '@angular/core';
import { SpecialityService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { SpecialityItem2SpecialityItemVM } from '../../mappers';
import { SpecialityMemoryService } from '../../memory';
import { SpecialityItemVM, SpecialityVM } from '../../model';

@Injectable()
export class UpdateSpecialityService
  implements UseCase<SpecialityItemVM | null, SpecialityVM>
{
  constructor(
    private specialityService: SpecialityService,
    private memoryService: SpecialityMemoryService
  ) {}

  exec(specialitySave: SpecialityVM): Observable<SpecialityItemVM | null> {
    return this.specialityService
      .specialityControllerUpdate(specialitySave, specialitySave.id || 0)
      .pipe(
        map(SpecialityItem2SpecialityItemVM),
        tap((speciality: SpecialityItemVM) => {
          this.memoryService.update(speciality);
        })
      );
  }
}
