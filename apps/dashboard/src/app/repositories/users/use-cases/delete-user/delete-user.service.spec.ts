import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UsersService } from '@sm-soc/admin-sdk';
import { UsersMemoryService } from '../../memory';

import { DeleteUserService } from './delete-user.service';

describe('DeleteUserService', () => {
  let service: DeleteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeleteUserService,
        UsersService,
        UsersMemoryService,
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(DeleteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
