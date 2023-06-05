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
import { DoctorService } from './doctor.service';
import { FormComponent } from './form/form.component';
import { DoctorVM, RowActionDoctor } from './model';

@Component({
  selector: 'medigo-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit, OnDestroy {
  //TODO: Fix
  doctorData: TableDataVM<DoctorVM> = {
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
    private doctorService: DoctorService,
    private tableService: TableService,
    private stateService: StateService
  ) {}
  ngOnInit(): void {
    this.sub$.add(
      this.doctorService.getLoading$().subscribe((loading) => {
        this.loading = loading;
        this.stateService.setLoading(loading);
      })
    );
    this.sub$.add(
      this.doctorService.getData$().subscribe((doctor: DoctorVM[] | null) => {
        this.doctorData = {
          ...this.doctorData,
          body: doctor || [],
        };
        this.tableService.setData(this.doctorData);
      })
    );
    this.doctorService.get({});
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  clickAction(option: OptionAction): void {
    switch (option.option.value) {
      case RowActionDoctor.update:
        this.showModal(+option.data['id']);
        break;
      case RowActionDoctor.delete:
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

  showConfirm(doctor: DoctorVM): void {
    //TODO: Fix
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Servicio',
          body: `¿Está seguro que desea eliminar el asistente <strong>${doctor}</strong>?`,
        },
      },
      hasBackdrop: true,
    });

    dialogRef.componentInstance.closed.subscribe((res) => {
      dialogRef.close();
      if (res) {
        this.doctorService.delete(doctor?.id || 0);
      }
    });
  }
}
