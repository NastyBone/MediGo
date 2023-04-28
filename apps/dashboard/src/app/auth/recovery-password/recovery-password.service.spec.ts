import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@tecnops/dashboard-sdk';

import { RecoveryPasswordService } from './recovery-password.service';

describe('RecoveryPasswordService', () => {
  let service: RecoveryPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecoveryPasswordService,
        AuthService,
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(RecoveryPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
