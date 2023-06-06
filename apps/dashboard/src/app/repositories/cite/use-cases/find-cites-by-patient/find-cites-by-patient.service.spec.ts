import { TestBed } from '@angular/core/testing';

import { FindCitesByPatientService } from './find-cites-by-patient.service';

describe('FindCitesByPatientService', () => {
  let service: FindCitesByPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCitesByPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
