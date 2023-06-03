import { Injectable } from '@angular/core';
import { DoctorMemoryService } from './memory';
import { CreateDoctorService } from './use-cases/create-doctor/create-doctor.service';
import { DeleteDoctorService } from './use-cases/delete-doctor/delete-doctor.service';
import { FindDoctorService } from './use-cases/find-doctor/find-doctor.service';
import { GetDoctorsService } from './use-cases/get-doctors/get-doctors.service';
import { UpdateDoctorService } from './use-cases/update-doctor/update-doctor.service';
import { ListComponentService } from '../../common';
import { DoctorItemVM } from './model';
import { FindDoctorBySpecialityService } from './use-cases/find-doctor-by-speciality/find-doctor-by-speciality.service';
import { FindDoctorByUserIdService } from './use-cases/find-doctor-by-user-id/find-doctor-by-user-id.service';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class DoctorService extends ListComponentService<DoctorItemVM> {
  constructor(
    public createDoctorService: CreateDoctorService,
    public deleteDoctorService: DeleteDoctorService,
    public findDoctorService: FindDoctorService,
    public getDoctorsService: GetDoctorsService,
    public updateDoctorService: UpdateDoctorService,
    public doctorMemoryService: DoctorMemoryService,
    protected findDoctorBySpeciality: FindDoctorBySpecialityService,
    protected findDoctorByUserId: FindDoctorByUserIdService
  ) {
    super(
      getDoctorsService,
      doctorMemoryService,
      deleteDoctorService,
      createDoctorService,
      updateDoctorService,
      findDoctorService
    );
  }

  findByUserId$(id: number): Observable<DoctorItemVM> {
    this.setLoading(true);
    return this.findDoctorByUserId
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)));
  }

  findBySpecialityId$(id: number): Observable<DoctorItemVM> {
    this.setLoading(true);
    return this.findDoctorBySpeciality
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)));
  }
}
