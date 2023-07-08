import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { AuthService } from '@medigo/dashboard-sdk';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, HttpClient, HttpHandler],
      imports: [AuthModule]
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
