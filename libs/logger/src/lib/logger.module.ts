import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggerService } from './logger.service';
import { LoggerConfig, LoggerConfigKey } from './interfaces';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoggerService],
})
export class LoggerModule {
  static forRoot(
    config: LoggerConfig = { allowConsole: true }
  ): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: LoggerConfigKey, useValue: config },
        LoggerService,
      ],
    };
  }
}
