import { TestBed } from '@angular/core/testing';

import { FindCitesByDoctorService } from './find-cites-by-doctor.service';

describe('FindCitesByDoctorService', () => {
  let service: FindCitesByDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCitesByDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
