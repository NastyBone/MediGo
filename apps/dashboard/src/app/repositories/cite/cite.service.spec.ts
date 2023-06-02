import { TestBed } from '@angular/core/testing';

import { CiteService } from './cite.service';

describe('CiteService', () => {
  let service: CiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
