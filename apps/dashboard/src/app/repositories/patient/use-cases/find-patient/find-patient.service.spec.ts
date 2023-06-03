import { TestBed } from '@angular/core/testing';

import { FindPatientService } from './find-patient.service';

describe('FindPatientService', () => {
  let service: FindPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
