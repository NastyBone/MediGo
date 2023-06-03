import { TestBed } from '@angular/core/testing';

import { UpdateSpecialityService } from './update-speciality.service';

describe('UpdateSpecialityService', () => {
  let service: UpdateSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
