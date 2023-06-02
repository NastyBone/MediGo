import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UsersService } from '@medigo/admin-sdk';
import { UsersMemoryService } from '../../memory';

import { GetUsersService } from './get-users.service';

describe('GetUsersService', () => {
  let service: GetUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetUsersService,
        UsersService,
        UsersMemoryService,
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(GetUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
