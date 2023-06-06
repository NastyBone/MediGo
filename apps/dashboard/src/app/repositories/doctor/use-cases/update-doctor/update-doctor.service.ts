import { Injectable } from '@angular/core';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { DoctorMemoryService } from '../../memory';
import { DoctorItemVM, DoctorVM } from '../../model';
import { DoctorService } from '@medigo/dashboard-sdk';
import { Doctor2DoctorItemVM } from '../../mappers';

@Injectable()
export class UpdateDoctorService
  implements UseCase<DoctorItemVM | null, DoctorVM>
{
  constructor(
    private doctorService: DoctorService,
    private memoryService: DoctorMemoryService
  ) {}

  exec(doctorSave: DoctorVM): Observable<DoctorItemVM | null> {
    return this.doctorService
      .doctorControllerUpdate(doctorSave, doctorSave.id || 0)
      .pipe(
        map(Doctor2DoctorItemVM),
        tap((doctor: DoctorItemVM) => {
          this.memoryService.update(doctor);
        })
      );
  }
}
