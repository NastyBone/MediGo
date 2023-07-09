import { TestBed } from '@angular/core/testing';

import { FindPatientService } from './find-patient.service';
import { PatientService } from '@medigo/dashboard-sdk';
import { PatientModule } from '../../patient.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('FindPatientService', () => {
  let service: FindPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientService, HttpClient, HttpHandler],
      imports: [PatientModule, ToastModule]
    });
    service = TestBed.inject(FindPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
