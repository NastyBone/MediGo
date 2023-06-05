import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { DoctorService } from './doctor.service';
import { CreateDoctorService } from './use-cases/create-doctor/create-doctor.service';
import { DeleteDoctorService } from './use-cases/delete-doctor/delete-doctor.service';
import { FindDoctorService } from './use-cases/find-doctor/find-doctor.service';
import { FindDoctorBySpecialityService } from './use-cases/find-doctor-by-speciality/find-doctor-by-speciality.service';
import { FindDoctorByUserIdService } from './use-cases/find-doctor-by-user-id/find-doctor-by-user-id.service';
import { GetDoctorsService } from './use-cases/get-doctors/get-doctors.service';
import { UpdateDoctorService } from './use-cases/update-doctor/update-doctor.service';
import { FormComponent } from './form/form.component';
import { DoctorMemoryService } from './memory';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TableModule } from '../../common';
import { UsersModule } from '../users/users.module';
import { SpecialityModule } from '../speciality/speciality.module';

@NgModule({
  declarations: [DoctorComponent, FormComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    TableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    UsersModule,
    SpecialityModule,
  ],
  providers: [
    DoctorService,
    CreateDoctorService,
    DeleteDoctorService,
    FindDoctorService,
    FindDoctorBySpecialityService,
    FindDoctorByUserIdService,
    GetDoctorsService,
    UpdateDoctorService,
    DoctorMemoryService,
  ],
})
export class DoctorModule {}
