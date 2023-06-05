import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityComponent } from './availability.component';
import { AvailabilityService } from './availability.service';
import { GetAvailabilitiesService } from './use-cases/get-availabilities/get-availabilities.service';
import { FindAvailabilityByDoctorService } from './use-cases/find-availability-by-doctor/find-availability-by-doctor.service';
import { FindAvailabilityService } from './use-cases/find-availability/find-availability.service';
import { CreateAvailabilityService } from './use-cases/create-availability/create-availability.service';
import { UpdateAvailabilityService } from './use-cases/update-availability/update-availability.service';
import { DeleteAvailabilityService } from './use-cases/delete-availability/delete-availability.service';
import { FormComponent } from './form/form.component';
import { AvailabilityMemoryService } from './memory';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from '../../common';
import { DoctorModule } from '../doctor/doctor.module';

@NgModule({
  declarations: [AvailabilityComponent, FormComponent],
  imports: [
    CommonModule,
    AvailabilityRoutingModule,
    TableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    DoctorModule,
  ],
  providers: [
    AvailabilityService,
    GetAvailabilitiesService,
    FindAvailabilityByDoctorService,
    FindAvailabilityService,
    CreateAvailabilityService,
    UpdateAvailabilityService,
    DeleteAvailabilityService,
    AvailabilityMemoryService,
  ],
})
export class AvailabilityModule {}
