import { TestBed } from '@angular/core/testing';

import { UpdateSettingssService } from './update-settings.service';
import { SettingsService } from '@medigo/dashboard-sdk';
import { SettingsModule } from '../../settings.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('UpdateSettingsService', () => {
  let service: UpdateSettingssService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService, HttpClient, HttpHandler],
      imports: [SettingsModule, ToastModule]
    });
    service = TestBed.inject(UpdateSettingssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
