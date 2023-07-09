import { TestBed } from '@angular/core/testing';

import { FindPatientByUserIdService } from './find-patient-by-user-id.service';
import { PatientService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { PatientModule } from '../../patient.module';

describe('FindPatientByUserIdService', () => {
  let service: FindPatientByUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientService, HttpClient, HttpHandler],
      imports: [PatientModule, ToastModule]
    });
    service = TestBed.inject(FindPatientByUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
