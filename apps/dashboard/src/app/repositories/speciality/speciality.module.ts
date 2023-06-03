import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialityRoutingModule } from './speciality-routing.module';
import { SpecialityComponent } from './speciality.component';
import { SpecialityService } from './speciality.service';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [SpecialityComponent, FormComponent],
  imports: [CommonModule, SpecialityRoutingModule],
  providers: [SpecialityService],
})
export class SpecialityModule {}
