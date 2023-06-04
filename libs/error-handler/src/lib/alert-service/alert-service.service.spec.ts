import { TestBed } from '@angular/core/testing';

import { AlertServiceService } from './alert-service.service';

describe('AlertServiceService', () => {
  let service: AlertServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertServiceService],
    });
    service = TestBed.inject(AlertServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
