import { TestBed } from '@angular/core/testing';

import { FindSpecialityService } from './find-speciality.service';

describe('FindSpecialityService', () => {
  let service: FindSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
