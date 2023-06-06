import { TestBed } from '@angular/core/testing';

import { CreateSpecialityService } from './create-speciality.service';

describe('CreateSpecialityService', () => {
  let service: CreateSpecialityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSpecialityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
