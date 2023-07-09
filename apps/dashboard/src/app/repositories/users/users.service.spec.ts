import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { UsersService as _UsersService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UsersModule } from './users.module';
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_UsersService, HttpClient, HttpHandler],
      imports: [UsersModule]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
