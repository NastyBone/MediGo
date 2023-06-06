import { TestBed } from '@angular/core/testing';

import { GetAvailabilitiesService } from './get-availabilities.service';

describe('GetAvailabilitiesService', () => {
  let service: GetAvailabilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAvailabilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
