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

@NgModule({
  declarations: [AvailabilityComponent, FormComponent],
  imports: [CommonModule, AvailabilityRoutingModule],
  providers: [
    AvailabilityService,
    GetAvailabilitiesService,
    FindAvailabilityByDoctorService,
    FindAvailabilityService,
    CreateAvailabilityService,
    UpdateAvailabilityService,
    DeleteAvailabilityService,
  ],
})
export class AvailabilityModule {}
