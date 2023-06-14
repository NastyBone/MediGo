import { Injectable } from '@angular/core';
import { RecordMemoryService } from './memory';
import { CreateRecordService } from './use-cases/create-record/create-record.service';
import { DeleteRecordService } from './use-cases/delete-record/delete-record.service';
import { FindRecordService } from './use-cases/find-record/find-record.service';
import { GetRecordsService } from './use-cases/get-records/get-records.service';
import { UpdateRecordService } from './use-cases/update-record/update-record.service';
import { ListComponentService } from '../../common/memory-repository/list-component.service';
import { RecordItemVM } from './model';
import { FindRecordByDoctorService } from './use-cases/find-record-by-doctor/find-record-by-doctor.service';
import { FindRecordByPatientService } from './use-cases/find-record-by-patient/find-record-by-patient.service';
import { Observable, finalize } from 'rxjs';
import { GenerateRecordService } from './use-cases/generate-record/generate-record.service';
import { GetDoctorsService } from '../doctor/use-cases/get-doctors/get-doctors.service';
import { GetPatientsService } from '../patient/use-cases/get-patients/get-patients.service';
import { PatientItemVM } from '../patient/model';
import { DoctorItemVM } from '../doctor/model';

@Injectable()
export class RecordService extends ListComponentService<RecordItemVM> {
  constructor(
    public createRecordService: CreateRecordService,
    public deleteRecordService: DeleteRecordService,
    public findRecordService: FindRecordService,
    public getRecordsService: GetRecordsService,
    public updateRecordService: UpdateRecordService,
    public recordMemoryService: RecordMemoryService,
    protected findRecordByDoctor: FindRecordByDoctorService,
    protected findRecordByPatient: FindRecordByPatientService,
    protected generateRecord: GenerateRecordService,
    private getDoctorsService: GetDoctorsService,
    private getPatientsService: GetPatientsService
  ) {
    super(
      getRecordsService,
      recordMemoryService,
      deleteRecordService,
      createRecordService,
      updateRecordService,
      findRecordService
    );
  }

  findByDoctorId$(id: number): Observable<RecordItemVM[]> {
    this.setLoading(true);
    return this.findRecordByDoctor
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)));
  }

  findByPatientId$(id: number): Observable<RecordItemVM[]> {
    this.setLoading(true);
    return this.findRecordByPatient
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateReport$(id: number): Observable<any> {
    this.setLoading(true);
    return this.generateRecord
      .exec(id)
      .pipe(finalize(() => this.setLoading(false)));
  }

  getPatients$(load = true): Observable<Array<PatientItemVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.getPatientsService.exec({}).pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }

  getDoctors$(load = true): Observable<Array<DoctorItemVM> | null> {
    if (load) {
      this.setLoading(load);
    }
    return this.getDoctorsService.exec({}).pipe(
      finalize(() => {
        if (load) {
          this.setLoading(false);
        }
      })
    );
  }
}
