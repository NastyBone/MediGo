import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Optional } from '@angular/core';

import { LoggerConfig, LoggerConfigKey, LoggerService } from '@medigo/logger';

import {
  AlertMethotKey,
  AlertServiceKey,
  ErrorHandlerConfigKey,
} from './consts';
import { ErrorParserService, ErrorSource } from './error-parser';
import { ErrorHandlerConfig } from './interfaces';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  private config: ErrorHandlerConfig = {
    alertClientErrors: false,
  };

  constructor(
    private errorParserService: ErrorParserService,
    private loggerService: LoggerService,
    @Optional()
    @Inject(ErrorHandlerConfigKey)
    private configOptions: ErrorHandlerConfig,
    @Optional() @Inject(AlertServiceKey) private alertSevice: any,
    @Optional()
    @Inject(AlertMethotKey)
    private alertMethodName: string = 'error',
    @Optional()
    @Inject(LoggerConfigKey)
    private loggerConfig: LoggerConfig
  ) {
    this.config = Object.assign(this.config, configOptions);
  }

  handleError(error: Error | HttpErrorResponse): void {
    const parsedError = this.errorParserService.getErrorAndSource(error);
    const message = this.errorParserService.getMessage(error);
    if (
      parsedError.source === ErrorSource.Server ||
      (this.config.alertClientErrors &&
        parsedError.source === ErrorSource.Client)
    ) {
      this.alertSevice[this.alertMethodName](message);
    }
    this.loggerService.reportError(parsedError as any, this.loggerConfig);
  }
}
