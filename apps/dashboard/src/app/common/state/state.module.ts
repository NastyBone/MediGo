import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { StateComponent } from './state.component';

@NgModule({
  declarations: [StateComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [StateComponent],
})
export class StateModule {}
