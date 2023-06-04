import { CommonModule } from '@angular/common';
import { forwardRef, ModuleWithProviders, NgModule } from '@angular/core';

import { LoggerConfigKey, LoggerModule } from '@medigo/logger';

import { AlertServiceService } from './alert-service';
import {
  AlertMethotKey,
  AlertServiceKey,
  ErrorHandlerConfigKey,
} from './consts';
import { ErrorHandlerService } from './error-handler.service';
import { ErrorParserService } from './error-parser';
import { ErrorHandlerConfig } from './interfaces';

/**
 * Módulo manejador de errores
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, LoggerModule],
  providers: [ErrorHandlerService, ErrorParserService, AlertServiceService],
})
export class ErrorHandlerModule {
  static forRoot<T>(
    config?: ErrorHandlerConfig<T>
  ): ModuleWithProviders<ErrorHandlerModule> {
    return {
      ngModule: ErrorHandlerModule,
      providers: [
        {
          provide: ErrorHandlerConfigKey,
          useValue: config,
        },
        {
          provide: AlertServiceKey,
          useExisting:
            forwardRef(() => config?.alertService) || AlertServiceService,
        },
        {
          provide: AlertMethotKey,
          useValue: config?.alertMethodName,
        },
        {
          provide: LoggerConfigKey,
          useValue: config?.loggerConfig || {
            allowConsole: true,
          },
        },
      ],
    };
  }
}
