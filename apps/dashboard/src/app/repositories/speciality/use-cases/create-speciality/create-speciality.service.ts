import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SpecialityMemoryService } from '../../memory';
import { SpecialityVM, SpecialityItemVM } from '../../model';
import { SpecialityService } from '@medigo/dashboard-sdk';
import { SpecialityItem2SpecialityItemVM } from '../../mappers';

@Injectable()
export class CreateSpecialityService {
  constructor(
    private specialityService: SpecialityService,
    private memoryService: SpecialityMemoryService
  ) {}

  exec(SpecialitySave: SpecialityVM): Observable<SpecialityItemVM | null> {
    return this.specialityService
      .specialityControllerCreate(SpecialitySave)
      .pipe(
        map(SpecialityItem2SpecialityItemVM),
        tap((speciality) => this.memoryService.create(speciality))
      );
  }
}
