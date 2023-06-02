import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityComponent } from './availability.component';


@NgModule({
  declarations: [
    AvailabilityComponent
  ],
  imports: [
    CommonModule,
    AvailabilityRoutingModule
  ]
})
export class AvailabilityModule { }
