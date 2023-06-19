import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordRoutingModule } from './record-routing.module';
import { RecordComponent } from './record.component';
import { RecordService } from './record.service';
import { CreateRecordService } from './use-cases/create-record/create-record.service';
import { DeleteRecordService } from './use-cases/delete-record/delete-record.service';
import { FindRecordService } from './use-cases/find-record/find-record.service';
import { FindRecordByDoctorService } from './use-cases/find-record-by-doctor/find-record-by-doctor.service';
import { FindRecordByPatientService } from './use-cases/find-record-by-patient/find-record-by-patient.service';
import { GetRecordsService } from './use-cases/get-records/get-records.service';
import { UpdateRecordService } from './use-cases/update-record/update-record.service';
import { FormComponent } from './form/form.component';
import { RecordMemoryService } from './memory';
import { GenerateRecordService } from './use-cases/generate-record/generate-record.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from '../../common';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CiteModule } from '../cite/cite.module';
import { FindPatientsCitesByDoctorService } from './use-cases/find-patients-cites-by-doctor/find-patients-cites-by-doctor.service';

@NgModule({
  declarations: [RecordComponent, FormComponent],
  imports: [
    CommonModule,
    RecordRoutingModule,
    TableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CiteModule,
    DoctorModule,
  ],
  providers: [
    RecordService,
    CreateRecordService,
    DeleteRecordService,
    FindRecordService,
    FindRecordByDoctorService,
    FindRecordByPatientService,
    FindPatientsCitesByDoctorService,
    GetRecordsService,
    UpdateRecordService,
    GenerateRecordService,
    RecordMemoryService,
  ],
})
export class RecordModule {}
