import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiteRoutingModule } from './cite-routing.module';
import { CiteComponent } from './cite.component';
import { CiteService } from './cite.service';
import { CreateCiteService } from './use-cases/create-cite/create-cite.service';
import { DeleteCiteService } from './use-cases/delete-cite/delete-cite.service';
import { FindCiteService } from './use-cases/find-cite/find-cite.service';
import { FindCitesByDoctorService } from './use-cases/find-cites-by-doctor/find-cites-by-doctor.service';
import { FindCitesByPatientService } from './use-cases/find-cites-by-patient/find-cites-by-patient.service';
import { GetCitesService } from './use-cases/get-cites/get-cites.service';
import { UpdateCiteService } from './use-cases/update-cite/update-cite.service';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [CiteComponent, FormComponent],
  imports: [CommonModule, CiteRoutingModule],
  providers: [
    CiteService,
    CreateCiteService,
    DeleteCiteService,
    FindCiteService,
    FindCitesByDoctorService,
    FindCitesByPatientService,
    GetCitesService,
    UpdateCiteService,
  ],
})
export class CiteModule {}
