import { TestBed } from '@angular/core/testing';

import { CreatePatientService } from './create-patient.service';
import { PatientService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { PatientModule } from '../../patient.module';

describe('CreatePatientService', () => {
  let service: CreatePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientService, HttpClient, HttpHandler],
      imports: [PatientModule, ToastModule]
    });
    service = TestBed.inject(CreatePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
