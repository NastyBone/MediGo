import { TestBed } from '@angular/core/testing';

import { FindPatientByUserIdService } from './find-patient-by-user-id.service';

describe('FindPatientByUserIdService', () => {
  let service: FindPatientByUserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindPatientByUserIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
