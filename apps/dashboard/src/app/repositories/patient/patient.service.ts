import { Injectable } from '@angular/core';
import { PatientMemoryService } from './memory';
import { CreatePatientService } from './use-cases/create-patient/create-patient.service';
import { DeletePatientService } from './use-cases/delete-patient/delete-patient.service';
import { FindPatientService } from './use-cases/find-patient/find-patient.service';
import { GetPatientsService } from './use-cases/get-patients/get-patients.service';
import { UpdatePatientService } from './use-cases/update-patient/update-patient.service';
import { ListComponentService } from '../../common/memory-repository/list-component.service';
import { PatientItemVM } from './model';
import { FindPatientByUserIdService } from './use-cases/find-patient-by-user-id/find-patient-by-user-id.service';
import { Observable, finalize } from 'rxjs';
import { GetUsersService } from '../users/use-cases';
import { UserVM } from '../users/model';

@Injectable()
export class PatientService extends ListComponentService<PatientItemVM> {
  constructor(
    public createPatientService: CreatePatientService,
    public deletePatientService: DeletePatientService,
    public findPatientService: FindPatientService,
    public getPatientsService: GetPatientsService,
    public updatePatientService: UpdatePatientService,
    public patientMemoryService: PatientMemoryService,
    protected findPatientByUserId: FindPatientByUserIdService,
    private getUsersService: GetUsersService
  ) {
    super(
      getPatientsService,
      patientMemoryService,
      deletePatientService,
      createPatientService,
      updatePatientService,
      findPatientService
    );
  }

  findByUser(id: number): Observable<PatientItemVM> {
    this.setLoading(true);
    return this.findPatientByUserId
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)));
  }

  getUsers$(load = true): Observable<Array<UserVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.getUsersService.exec({}).pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }
}
