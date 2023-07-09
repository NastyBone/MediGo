import { TestBed } from '@angular/core/testing';

import { PatientService } from './patient.service';
import { PatientService as _PatientService, UsersService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PatientModule } from './patient.module';
describe('PatientService', () => {
  let service: PatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_PatientService, UsersService, HttpClient, HttpHandler],
      imports: [PatientModule]
    });
    service = TestBed.inject(PatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
