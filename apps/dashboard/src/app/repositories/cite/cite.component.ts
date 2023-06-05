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
import { CiteService } from './cite.service';
import { FormComponent } from './form/form.component';
import { CiteVM, RowActionCite } from './model';

@Component({
  selector: 'medigo-cite',
  templateUrl: './cite.component.html',
  styleUrls: ['./cite.component.scss'],
})
export class CiteComponent implements OnInit, OnDestroy {
  //TODO: Fix
  citeData: TableDataVM<CiteVM> = {
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
    private citeService: CiteService,
    private tableService: TableService,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    this.sub$.add(
      this.citeService
        .getData$()
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(this.loading);
          })
        )
        .subscribe((cite: CiteVM[] | null) => {
          this.citeData = {
            ...this.citeData,
            body: cite || [],
          };
          this.tableService.setData(this.citeData);
        })
    );
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  clickAction(option: OptionAction): void {
    switch (option.option.value) {
      case RowActionCite.update:
        this.showModal(+option.data['id']);
        break;
      case RowActionCite.delete:
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

  showConfirm(cite: CiteVM): void {
    //TODO: Fix
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Servicio',
          body: `¿Está seguro que desea eliminar el asistente <strong>${cite}</strong>?`,
        },
      },
      hasBackdrop: true,
    });

    dialogRef.componentInstance.closed.subscribe((res) => {
      dialogRef.close();
      if (res) {
        this.citeService.delete(cite?.id || 0);
      }
    });
  }
}
