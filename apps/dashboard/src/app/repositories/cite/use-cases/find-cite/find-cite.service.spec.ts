import { TestBed } from '@angular/core/testing';

import { FindCiteService } from './find-cite.service';

describe('FindCiteService', () => {
  let service: FindCiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindCiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
