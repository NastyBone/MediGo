import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ConfirmModalComponent } from './confirm-modal.component';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  exports: [ConfirmModalComponent],
})
export class ConfirmModalModule {}
