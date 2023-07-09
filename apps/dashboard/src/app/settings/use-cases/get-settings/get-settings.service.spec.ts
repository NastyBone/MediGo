import { TestBed } from '@angular/core/testing';

import { GetSettingsService } from './get-settings.service';
import { SettingsService } from '@medigo/dashboard-sdk';
import { SettingsModule } from '../../settings.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ToastModule } from '@medigo/toast';

describe('GetSettingsService', () => {
  let service: GetSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [SettingsService, HttpClient, HttpHandler],
      imports: [SettingsModule, ToastModule]
    });
    service = TestBed.inject(GetSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
