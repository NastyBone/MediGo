import { TestBed } from '@angular/core/testing';

import { UpdatePatientService } from './update-patient.service';
import { PatientService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { PatientModule } from '../../patient.module';

describe('UpdatePatientService', () => {
  let service: UpdatePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientService, HttpClient, HttpHandler],
      imports: [PatientModule, ToastModule]
    });
    service = TestBed.inject(UpdatePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
