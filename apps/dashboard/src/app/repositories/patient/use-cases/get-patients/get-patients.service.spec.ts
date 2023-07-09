import { TestBed } from '@angular/core/testing';

import { GetPatientsService } from './get-patients.service';
import { PatientService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { PatientModule } from '../../patient.module';

describe('GetPatientsService', () => {
  let service: GetPatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientService, HttpClient, HttpHandler],
      imports: [PatientModule, ToastModule]
    });
    service = TestBed.inject(GetPatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
