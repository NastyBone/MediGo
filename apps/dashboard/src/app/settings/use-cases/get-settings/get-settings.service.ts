import { Injectable } from '@angular/core';
import { SettingsService } from '@medigo/dashboard-sdk';
import { Observable, map } from 'rxjs';
import { SettingsVM } from '../../models';
import { Settings2SettingsVM } from '../../mappers';

@Injectable()
export class GetSettingsService {
  constructor(private settingsService: SettingsService) {}

  exec(): Observable<SettingsVM> {
    return this.settingsService
      .settingsControllerGetConfig()
      .pipe(map(Settings2SettingsVM));
  }
}
