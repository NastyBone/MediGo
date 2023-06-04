import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TOAST_OPTIONS } from './options-token';
import { ToastService } from './toast.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule.forRoot()],
  providers: [ToastService],
})
export class ToastModule {
  static forRoot(options?: ToastrOptions): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: TOAST_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
