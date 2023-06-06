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
import { FormComponent } from './form/form.component';
import { RecordItemVM, RowActionRecord } from './model';
import { RecordService } from './record.service';

@Component({
  selector: 'medigo-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit, OnDestroy {
  //TODO: Fix
  recordData: TableDataVM<RecordItemVM> = {
    headers: [
      {
        columnDef: 'date',
        header: 'Fecha',
        cell: (element: { [key: string]: string }) => `${element['date']}`,
      },
      {
        columnDef: 'description',
        header: 'Descripción',
        cell: (element: { [key: string]: string }) =>
          `${element['description']}`,
      },
      {
        columnDef: 'doctor',
        header: 'Doctor',
        cell: (element: { [key: string]: string | any }) =>
          `${element['doctor']['user']['lastName']} ${element['doctor']['user']['firstName']}`,
      },
      {
        columnDef: 'patient',
        header: 'Paciente',
        cell: (element: { [key: string]: string | any }) =>
          `${element['patient']['user']['lastName']} ${element['patient']['user']['firstName']}`,
      },
    ],
    body: [],
    options: [
      { name: 'Editar', value: 'update', icon: 'edit' },
      { name: 'Eliminar', value: 'delete', icon: 'delete' },
      { name: 'Imprimir', value: 'print', icon: 'print' },
    ],
  };

  sub$ = new Subscription();
  reportForm!: FormGroup;
  disableDateSubmit = true;
  loading = false;

  constructor(
    private matDialog: MatDialog,
    private recordService: RecordService,
    private tableService: TableService,
    private stateService: StateService
  ) {}
  ngOnInit(): void {
    this.sub$.add(
      this.recordService.getLoading$().subscribe((loading) => {
        this.loading = loading;
        this.stateService.setLoading(loading);
      })
    );
    this.sub$.add(
      this.recordService
        .getData$()
        .subscribe((record: RecordItemVM[] | null) => {
          this.recordData = {
            ...this.recordData,
            body: record || [],
          };
          this.tableService.setData(this.recordData);
        })
    );
    this.recordService.get({});
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  clickAction(option: OptionAction): void {
    switch (option.option.value) {
      case RowActionRecord.update:
        this.showModal(+option.data['id']);
        break;
      case RowActionRecord.delete:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.showConfirm(option.data as any);
        break;
      case RowActionRecord.print:
        this.recordService
          .generateReport$(+option.data['id'])
          .subscribe((res) => window.open(res as string, '_blank'));
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

  showConfirm(record: RecordItemVM): void {
    //TODO: Fix
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Servicio',
          body: `¿Está seguro que desea eliminar el asistente <strong>${record}</strong>?`,
        },
      },
      hasBackdrop: true,
    });

    dialogRef.componentInstance.closed.subscribe((res) => {
      dialogRef.close();
      if (res) {
        this.recordService.delete(record?.id || 0);
      }
    });
  }
}
