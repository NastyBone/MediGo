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
import { FormComponent } from './form/form.component';
import { RecordVM, RowActionRecord } from './model';
import { RecordService } from './record.service';

@Component({
  selector: 'medigo-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit, OnDestroy {
  //TODO: Fix
  recordData: TableDataVM<RecordVM> = {
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
    private recordService: RecordService,
    private tableService: TableService,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    this.sub$.add(
      this.recordService
        .getData$()
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(this.loading);
          })
        )
        .subscribe((record: RecordVM[] | null) => {
          this.recordData = {
            ...this.recordData,
            body: record || [],
          };
          this.tableService.setData(this.recordData);
        })
    );
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

  showConfirm(record: RecordVM): void {
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
