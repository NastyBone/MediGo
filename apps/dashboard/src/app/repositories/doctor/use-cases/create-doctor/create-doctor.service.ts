import { Injectable } from '@angular/core';
import { DoctorService } from '@medigo/dashboard-sdk';
import { DoctorMemoryService } from '../../memory';
import { DoctorItemVM, DoctorVM } from '../../model';
import { Observable, map, tap } from 'rxjs';
import { Doctor2DoctorItemVM } from '../../mappers';

@Injectable()
export class CreateDoctorService {
  constructor(
    private doctorService: DoctorService,
    private memoryService: DoctorMemoryService
  ) {}

  exec(DoctorSave: DoctorVM): Observable<DoctorItemVM | null> {
    return this.doctorService.doctorControllerCreate(DoctorSave).pipe(
      map(Doctor2DoctorItemVM),
      tap((doctor) => this.memoryService.create(doctor))
    );
  }
}
