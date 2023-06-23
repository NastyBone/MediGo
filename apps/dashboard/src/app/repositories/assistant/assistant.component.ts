import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  TableDataVM,
  TableService,
  OptionAction,
  ConfirmModalComponent,
} from '../../common';
import { StateService } from '../../common/state';
import { AssistantItemVM, RowActionAssistant } from './model';
import { AssistantService } from './assistant.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'medigo-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit, OnDestroy {
  assistantData: TableDataVM<AssistantItemVM> = {
    headers: [
      {
        columnDef: 'firstName',
        header: 'Nombre',
        cell: (element: { [key: string]: string | any }) =>
          `${element['user']['firstName']}`,
      },
      {
        columnDef: 'lastName',
        header: 'Apellido',
        cell: (element: { [key: string]: string | any }) =>
          `${element['user']['lastName']}`,
      },
      {
        columnDef: 'doctor',
        header: 'Doctor',
        cell: (element: { [key: string]: string | any }) =>
          `${element['doctor']['user']['lastName']} ${element['doctor']['user']['firstName']}`,
      },
    ],
    body: [],
    options: [],
  };

  sub$ = new Subscription();
  reportForm!: FormGroup;
  disableDateSubmit = true;
  loading = false;

  constructor(
    private matDialog: MatDialog,
    private assistantService: AssistantService,
    private tableService: TableService,
    private stateService: StateService
  ) {}
  ngOnInit(): void {
    this.sub$.add(
      this.assistantService.getLoading$().subscribe((loading) => {
        this.loading = loading;
        this.stateService.setLoading(loading);
      })
    );
    this.sub$.add(
      this.assistantService
        .getData$()
        .subscribe((assistant: AssistantItemVM[] | null) => {
          this.assistantData = {
            ...this.assistantData,
            body: assistant || [],
          };
          this.tableService.setData(this.assistantData);
        })
    );
    this.assistantService.get({});
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  clickAction(option: OptionAction): void {
    switch (option.option.value) {
      case RowActionAssistant.update:
        this.showModal(+option.data['id']);
        break;
      case RowActionAssistant.delete:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.showConfirm(option.data as any);
        break;
    }
  }

  showModal(id?: number): void {
    const modal = this.matDialog.open(FormComponent, {
      hasBackdrop: true,
      data: {
        id,
      },
    });
    modal.componentInstance.closed.subscribe(() => {
      modal.close();
    });
  }

  showConfirm(assistant: AssistantItemVM): void {
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Asistente',
          body: `¿Está seguro que desea eliminar el asistente <strong>${assistant.user?.firstName} ${assistant.user?.lastName}</strong>?`,
        },
      },
      hasBackdrop: true,
    });

    dialogRef.componentInstance.closed.subscribe((res) => {
      dialogRef.close();
      if (res) {
        this.assistantService.delete(assistant?.id || 0);
      }
    });
  }
}
