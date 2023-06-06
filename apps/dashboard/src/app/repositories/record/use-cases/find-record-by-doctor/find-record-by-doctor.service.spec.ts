import { TestBed } from '@angular/core/testing';

import { FindRecordByDoctorService } from './find-record-by-doctor.service';

describe('FindRecordByDoctorService', () => {
  let service: FindRecordByDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindRecordByDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
