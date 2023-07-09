import { TestBed } from '@angular/core/testing';

import { RecordService } from './record.service';
import { RecordService as _RecordService, PatientService, DoctorService, CiteService } from '@medigo/dashboard-sdk';
import { RecordModule } from './record.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
describe('RecordService', () => {
  let service: RecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_RecordService, CiteService, PatientService, DoctorService, HttpHandler, HttpClient], imports: [RecordModule]
    });
    service = TestBed.inject(RecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
