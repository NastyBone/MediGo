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
import { PatientVM, RowActionPatient } from './model';
import { PatientService } from './patient.service';

@Component({
  selector: 'medigo-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit, OnDestroy {
  //TODO: Fix
  patientData: TableDataVM<PatientVM> = {
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
    private patientService: PatientService,
    private tableService: TableService,
    private stateService: StateService
  ) {}
  ngOnInit(): void {
    this.sub$.add(
      this.patientService.getLoading$().subscribe((loading) => {
        this.loading = loading;
        this.stateService.setLoading(loading);
      })
    );
    this.sub$.add(
      this.patientService
        .getData$()
        .subscribe((patient: PatientVM[] | null) => {
          this.patientData = {
            ...this.patientData,
            body: patient || [],
          };
          this.tableService.setData(this.patientData);
        })
    );
    this.patientService.get({});
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  clickAction(option: OptionAction): void {
    switch (option.option.value) {
      case RowActionPatient.update:
        this.showModal(+option.data['id']);
        break;
      case RowActionPatient.delete:
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

  showConfirm(patient: PatientVM): void {
    //TODO: Fix
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Servicio',
          body: `¿Está seguro que desea eliminar el asistente <strong>${patient}</strong>?`,
        },
      },
      hasBackdrop: true,
    });

    dialogRef.componentInstance.closed.subscribe((res) => {
      dialogRef.close();
      if (res) {
        this.patientService.delete(patient?.id || 0);
      }
    });
  }
}
