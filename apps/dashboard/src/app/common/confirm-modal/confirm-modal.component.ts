import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModalMessageModel } from './modal-message-model';

@Component({
  selector: 'tecnops-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  message: ModalMessageModel = {
    title: 'Error al cargar titulo',
    body: 'Error al cargar mensaje',
  };
  @Output()
  closed = new EventEmitter<boolean>();
  constructor(@Inject(MAT_DIALOG_DATA) data: { message: ModalMessageModel }) {
    this.message = data.message;
  }

  closeModal(option: boolean): void {
    this.closed.emit(option);
  }
}
