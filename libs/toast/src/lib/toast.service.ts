import { Inject, Injectable, Optional } from '@angular/core';

import * as toastr from 'toastr';

import { TranslateService } from '@ngx-translate/core';

import { TOAST_OPTIONS } from './options-token';

@Injectable()
export class ToastService {
  constructor(
    @Optional()
    @Inject(TOAST_OPTIONS)
    private options: ToastrOptions = { preventDuplicates: true },
    private translateService: TranslateService
  ) {
    Object.assign(toastr.options, this.options);
  }

  error(message: string): void {
    toastr.error(this.translateService.instant(message));
  }

  warning(message: string): void {
    toastr.warning(this.translateService.instant(message));
  }

  success(message: string): void {
    toastr.success(this.translateService.instant(message));
  }

  info(message: string): void {
    toastr.info(this.translateService.instant(message));
  }
}
