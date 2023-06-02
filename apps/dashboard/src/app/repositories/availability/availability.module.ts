import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityComponent } from './availability.component';
import { AvailabilityService } from './availability.service';

@NgModule({
  declarations: [AvailabilityComponent],
  imports: [CommonModule, AvailabilityRoutingModule],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}
