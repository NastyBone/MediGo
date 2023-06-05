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
import { PatientMemoryService } from './memory';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from '../../common';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [PatientComponent, FormComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    TableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    UsersModule,
  ],
  providers: [
    PatientService,
    CreatePatientService,
    DeletePatientService,
    FindPatientByUserIdService,
    FindPatientService,
    GetPatientsService,
    UpdatePatientService,
    PatientMemoryService,
  ],
})
export class PatientModule {}
