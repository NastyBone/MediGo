import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, finalize } from 'rxjs';
import {
  TableDataVM,
  TableService,
  OptionAction,
  ConfirmModalComponent,
} from '../../common';
import { StateService } from '../../common/state';
import { AssistantVM, RowActionAssistant } from './model';
import { AssistantService } from './assistant.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'medigo-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit, OnDestroy {
  //TODO: Fix
  assistantData: TableDataVM<AssistantVM> = {
    headers: [
      {
        columnDef: 'name',
        header: 'Nombre',
        cell: (element: { [key: string]: string }) => `${element['name']}`,
      },
      {
        columnDef: 'price',
        header: 'Precio',
        cell: (element: { [key: string]: string }) => `${element['price']}`,
      },
      {
        columnDef: 'description',
        header: 'Descripción',
        cell: (element: { [key: string]: string }) =>
          `${element['description']}`,
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
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    this.sub$.add(
      this.assistantService
        .getData$()
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(this.loading);
          })
        )
        .subscribe((assistant: AssistantVM[] | null) => {
          this.assistantData = {
            ...this.assistantData,
            body: assistant || [],
          };
          this.tableService.setData(this.assistantData);
        })
    );
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
    // modal.componentInstance.closed.subscribe(() => {
    //   modal.close();
    // });
    //TODO: Fix
  }

  showConfirm(assistant: AssistantVM): void {
    //TODO: Fix
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Servicio',
          body: `¿Está seguro que desea eliminar el asistente <strong>${assistant}</strong>?`,
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
