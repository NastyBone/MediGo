import { TestBed } from '@angular/core/testing';

import { UpdateSettingsService } from './update-settings.service';

describe('UpdateSettingsService', () => {
  let service: UpdateSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
