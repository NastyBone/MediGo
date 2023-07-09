import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { GetSettingsService } from './use-cases/get-settings/get-settings.service';
import { UpdateSettingssService } from './use-cases/update-settings/update-settings.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SettingsModule } from './settings.module';
import { SettingsService as _SettingsService } from '@medigo/dashboard-sdk';
describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [_SettingsService, GetSettingsService, UpdateSettingssService, HttpClient, HttpHandler],
      imports: [SettingsModule]
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
