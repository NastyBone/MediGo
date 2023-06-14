import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { StateComponent } from './state.component';

@NgModule({
  declarations: [StateComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [StateComponent],
})
export class StateModule {}
