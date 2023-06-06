import { Injectable } from '@angular/core';
import { DoctorMemoryService } from './memory';
import { CreateDoctorService } from './use-cases/create-doctor/create-doctor.service';
import { DeleteDoctorService } from './use-cases/delete-doctor/delete-doctor.service';
import { FindDoctorService } from './use-cases/find-doctor/find-doctor.service';
import { GetDoctorsService } from './use-cases/get-doctors/get-doctors.service';
import { UpdateDoctorService } from './use-cases/update-doctor/update-doctor.service';
import { ListComponentService } from '../../common/memory-repository/list-component.service';
import { DoctorItemVM } from './model';
import { FindDoctorBySpecialityService } from './use-cases/find-doctor-by-speciality/find-doctor-by-speciality.service';
import { FindDoctorByUserIdService } from './use-cases/find-doctor-by-user-id/find-doctor-by-user-id.service';
import { Observable, finalize } from 'rxjs';
import { GetSpecialitiesService } from '../speciality/use-cases/get-specialities/get-specialities.service';
import { SpecialityItemVM } from '../speciality/model';
import { FindAllDoctorsService } from '../users/use-cases/find-all-doctors/find-all-doctors.service';
import { UserPatientVM } from '../users/model/user-patient-vm';

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
    protected findDoctorByUserId: FindDoctorByUserIdService,
    private getUsersService: FindAllDoctorsService,
    private getSpecialityService: GetSpecialitiesService
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

  getUsers$(load = true): Observable<Array<UserPatientVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.getUsersService.exec().pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }

  getSpecialities$(load = true): Observable<Array<SpecialityItemVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.getSpecialityService.exec({}).pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }
}
