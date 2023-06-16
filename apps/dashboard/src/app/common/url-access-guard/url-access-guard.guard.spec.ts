import { TestBed } from '@angular/core/testing';

import { UrlAccessGuardGuard } from './url-access-guard.guard';

describe('UrlAccessGuardGuard', () => {
  let guard: UrlAccessGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UrlAccessGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
