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
import { CiteMemoryService } from './memory';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from '../../common';

@NgModule({
  declarations: [CiteComponent, FormComponent],
  imports: [
    CommonModule,
    CiteRoutingModule,
    TableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    CiteService,
    CreateCiteService,
    DeleteCiteService,
    FindCiteService,
    FindCitesByDoctorService,
    FindCitesByPatientService,
    GetCitesService,
    UpdateCiteService,
    CiteMemoryService,
  ],
})
export class CiteModule {}
