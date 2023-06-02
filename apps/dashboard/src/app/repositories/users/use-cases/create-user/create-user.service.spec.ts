import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UsersService } from '@sm-soc/admin-sdk';
import { UsersMemoryService } from '../../memory';

import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateUserService,
        UsersService,
        UsersMemoryService,
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(CreateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
