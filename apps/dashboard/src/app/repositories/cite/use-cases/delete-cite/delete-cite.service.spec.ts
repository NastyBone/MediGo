import { TestBed } from '@angular/core/testing';

import { DeleteCiteService } from './delete-cite.service';

describe('DeleteCiteService', () => {
  let service: DeleteCiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
