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
import { DoctorItemVM, RowActionDoctor } from './model';

@Component({
  selector: 'medigo-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit, OnDestroy {
  doctorData: TableDataVM<DoctorItemVM> = {
    headers: [
      {
        columnDef: 'lastName',
        header: 'Apellido',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (element: { [key: string]: string | any }) =>
          `${element['user.lastName']}`,
      },
      {
        columnDef: 'firstName',
        header: 'Nombre',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (element: { [key: string]: string | any }) =>
          `${element['user.firstName']}`,
      },
      {
        columnDef: 'speciality',
        header: 'Especialidad',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (element: { [key: string]: string | any }) =>
          `${element['speciality.name']}`,
      },
      {
        columnDef: 'phone',
        header: 'Teléfono',
        cell: (element: { [key: string]: string }) => `${element['phone']}`,
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
  ) { }
  ngOnInit(): void {
    this.sub$.add(
      this.doctorService.getLoading$().subscribe((loading) => {
        this.loading = loading;
        this.stateService.setLoading(loading);
      })
    );
    this.sub$.add(
      this.doctorService
        .getData$()
        .subscribe((doctor: DoctorItemVM[] | null) => {
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
      autoFocus: false,
      data: {
        id,
      },
    });
    modal.componentInstance.closed.subscribe(() => {
      modal.close();
    });
  }

  showConfirm(doctor: DoctorItemVM): void {
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Doctor',
          body: `¿Está seguro que desea eliminar el doctor <strong>${doctor.user?.firstName} ${doctor.user?.lastName}</strong>?`,
        },
      },
      hasBackdrop: true,
      autoFocus: false,
    });

    dialogRef.componentInstance.closed.subscribe((res) => {
      dialogRef.close();
      if (res) {
        this.doctorService.delete(doctor?.id || 0);
      }
    });
  }
}
