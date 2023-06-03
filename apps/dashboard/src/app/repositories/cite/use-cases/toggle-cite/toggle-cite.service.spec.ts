import { TestBed } from '@angular/core/testing';

import { ToggleCiteService } from './toggle-cite.service';

describe('ToggleCiteService', () => {
  let service: ToggleCiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleCiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
