import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { DoctorService } from './doctor.service';

@NgModule({
  declarations: [DoctorComponent],
  imports: [CommonModule, DoctorRoutingModule],
  providers: [DoctorService],
})
export class DoctorModule {}
