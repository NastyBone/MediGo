import { TestBed } from '@angular/core/testing';

import { FindRecordByPatientService } from './find-record-by-patient.service';

describe('FindRecordByPatientService', () => {
  let service: FindRecordByPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindRecordByPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
