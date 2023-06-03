import { TestBed } from '@angular/core/testing';

import { UpdateCiteService } from './update-cite.service';

describe('UpdateCiteService', () => {
  let service: UpdateCiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
