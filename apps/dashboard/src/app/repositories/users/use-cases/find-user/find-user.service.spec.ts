import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UsersService } from '@medigo/dashboard-sdk';
import { UsersMemoryService } from '../../memory';

import { FindUserService } from './find-user.service';

describe('FindUserService', () => {
  let service: FindUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FindUserService,
        UsersService,
        UsersMemoryService,
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(FindUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
