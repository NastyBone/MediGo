import { TestBed } from '@angular/core/testing';

import { FindPatientsCitesByDoctorService } from './find-patients-cites-by-doctor.service';

describe('FindPatientsCitesByDoctorService', () => {
  let service: FindPatientsCitesByDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindPatientsCitesByDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
