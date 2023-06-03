import { TestBed } from '@angular/core/testing';

import { GetSpecialitiesService } from './get-specialities.service';

describe('GetSpecialitiesService', () => {
  let service: GetSpecialitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSpecialitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
