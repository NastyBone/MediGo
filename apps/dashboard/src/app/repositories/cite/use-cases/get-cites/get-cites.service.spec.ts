import { TestBed } from '@angular/core/testing';

import { GetCitesService } from './get-cites.service';

describe('GetCitesService', () => {
  let service: GetCitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
