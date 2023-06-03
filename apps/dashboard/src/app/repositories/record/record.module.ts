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

@NgModule({
  declarations: [RecordComponent, FormComponent],
  imports: [CommonModule, RecordRoutingModule],
  providers: [
    RecordService,
    CreateRecordService,
    DeleteRecordService,
    FindRecordService,
    FindRecordByDoctorService,
    FindRecordByPatientService,
    GetRecordsService,
    UpdateRecordService,
  ],
})
export class RecordModule {}
