import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SettingsVM } from '../../models';
import { SettingsService } from '@medigo/dashboard-sdk';
import { Settings2SettingsVM } from '../../mappers';

@Injectable()
export class UpdateSettingssService {
  constructor(private settingService: SettingsService) {}

  exec(settingSave: SettingsVM): Observable<SettingsVM> {
    return this.settingService
      .settingsControllerUploadConfig(settingSave)
      .pipe(map(Settings2SettingsVM));
  }
}
