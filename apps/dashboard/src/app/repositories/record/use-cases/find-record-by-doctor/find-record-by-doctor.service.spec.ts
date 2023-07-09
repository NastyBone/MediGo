import { TestBed } from '@angular/core/testing';

import { FindRecordByDoctorService } from './find-record-by-doctor.service';
import { RecordService } from '@medigo/dashboard-sdk';
import { RecordModule } from '../../record.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindRecordByDoctorService', () => {
  let service: FindRecordByDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordService, HttpClient, HttpHandler],
      imports: [RecordModule, ToastModule]
    });
    service = TestBed.inject(FindRecordByDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
