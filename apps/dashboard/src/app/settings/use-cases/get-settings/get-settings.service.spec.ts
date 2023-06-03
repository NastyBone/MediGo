import { TestBed } from '@angular/core/testing';

import { GetSettingsService } from './get-settings.service';

describe('GetSettingsService', () => {
  let service: GetSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
