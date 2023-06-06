import { TestBed } from '@angular/core/testing';

import { FindAllDoctorsService } from './find-all-doctors.service';

describe('FindAllDoctorsService', () => {
  let service: FindAllDoctorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindAllDoctorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
