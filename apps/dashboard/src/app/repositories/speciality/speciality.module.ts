import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialityRoutingModule } from './speciality-routing.module';
import { SpecialityComponent } from './speciality.component';
import { SpecialityService } from './speciality.service';
import { FormComponent } from './form/form.component';
import { CreateSpecialityService } from './use-cases/create-speciality/create-speciality.service';
import { GetSpecialitiesService } from './use-cases/get-specialities/get-specialities.service';
import { DeleteSpecialityService } from './use-cases/delete-speciality/delete-speciality.service';
import { UpdateSpecialityService } from './use-cases/update-speciality/update-speciality.service';
import { FindSpecialityService } from './use-cases/find-speciality/find-speciality.service';
import { SpecialityMemoryService } from './memory';

@NgModule({
  declarations: [SpecialityComponent, FormComponent],
  imports: [CommonModule, SpecialityRoutingModule],
  providers: [
    SpecialityService,
    CreateSpecialityService,
    GetSpecialitiesService,
    DeleteSpecialityService,
    UpdateSpecialityService,
    FindSpecialityService,
    SpecialityMemoryService,
  ],
})
export class SpecialityModule {}
