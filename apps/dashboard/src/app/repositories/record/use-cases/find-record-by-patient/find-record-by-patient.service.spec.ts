import { TestBed } from '@angular/core/testing';

import { FindRecordByPatientService } from './find-record-by-patient.service';
import { RecordService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { RecordModule } from '../../record.module';

describe('FindRecordByPatientService', () => {
  let service: FindRecordByPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [RecordService, HttpClient, HttpHandler],
      imports: [RecordModule, ToastModule]
    });
    service = TestBed.inject(FindRecordByPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
