import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsService } from './settings.service';
import { GetSettingsService } from './use-cases/get-settings/get-settings.service';
import { UpdateSettingssService } from './use-cases/update-settings/update-settings.service';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule],
  providers: [SettingsService, GetSettingsService, UpdateSettingssService],
})
export class SettingsModule {}
