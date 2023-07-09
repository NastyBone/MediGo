import { TestBed } from '@angular/core/testing';

import { DeletePatientService } from './delete-patient.service';
import { PatientService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';
import { PatientModule } from '../../patient.module';

describe('DeletePatientService', () => {
  let service: DeletePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientService, HttpClient, HttpHandler],
      imports: [PatientModule, ToastModule]
    });
    service = TestBed.inject(DeletePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
