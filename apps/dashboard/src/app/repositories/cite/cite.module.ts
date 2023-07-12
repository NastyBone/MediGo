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
import { FindByDateAndDoctorService } from './use-cases/find-by-date-and-doctor/find-by-date-and-doctor.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { AvailabilityModule } from '../availability/availability.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ReportCitesService } from './use-cases/report-cites/report-cites.service';
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
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatAutocompleteModule,
    NgxMatTimepickerModule,
    MatDividerModule,
    PatientModule,
    DoctorModule,
    AvailabilityModule,
  ],
  providers: [
    CiteService,
    CreateCiteService,
    DeleteCiteService,
    FindCiteService,
    FindCitesByDoctorService,
    FindCitesByPatientService,
    FindByDateAndDoctorService,
    GetCitesService,
    UpdateCiteService,
    CiteMemoryService,
    ReportCitesService
  ],
})
export class CiteModule { }
