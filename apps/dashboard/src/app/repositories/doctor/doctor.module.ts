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

@NgModule({
  declarations: [DoctorComponent, FormComponent],
  imports: [CommonModule, DoctorRoutingModule],
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
