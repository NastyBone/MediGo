import { TestBed } from '@angular/core/testing';
import { UsersService } from '@medigo/admin-sdk';

import { UsersMemoryService } from './users-memory.service';

describe('UsersMemoryService', () => {
  let service: UsersMemoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersMemoryService, UsersService],
    });
    service = TestBed.inject(UsersMemoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
