import { TestBed } from '@angular/core/testing';

import { CreatePatientService } from './create-patient.service';

describe('CreatePatientService', () => {
  let service: CreatePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
