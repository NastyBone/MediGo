import { TestBed } from '@angular/core/testing';

import { CreateCiteService } from './create-cite.service';

describe('CreateCiteService', () => {
  let service: CreateCiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
