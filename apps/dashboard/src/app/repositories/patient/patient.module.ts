import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { PatientService } from './patient.service';
import { CreatePatientService } from './use-cases/create-patient/create-patient.service';
import { DeletePatientService } from './use-cases/delete-patient/delete-patient.service';
import { FindPatientByUserIdService } from './use-cases/find-patient-by-user-id/find-patient-by-user-id.service';
import { FindPatientService } from './use-cases/find-patient/find-patient.service';
import { GetPatientsService } from './use-cases/get-patients/get-patients.service';
import { UpdatePatientService } from './use-cases/update-patient/update-patient.service';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [PatientComponent, FormComponent],
  imports: [CommonModule, PatientRoutingModule],
  providers: [
    PatientService,
    CreatePatientService,
    DeletePatientService,
    FindPatientByUserIdService,
    FindPatientService,
    GetPatientsService,
    UpdatePatientService,
  ],
})
export class PatientModule {}
