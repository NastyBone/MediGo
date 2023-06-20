import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import {
  TableDataVM,
  TableService,
  OptionAction,
  ConfirmModalComponent,
  UserStateService,
} from '../../common';
import { StateService } from '../../common/state';
import { CiteService } from './cite.service';
import { FormComponent } from './form/form.component';
import { CiteItemVM, RowActionCite } from './model';

@Component({
  selector: 'medigo-cite',
  templateUrl: './cite.component.html',
  styleUrls: ['./cite.component.scss'],
})
export class CiteComponent implements OnInit, OnDestroy {
  citeData: TableDataVM<CiteItemVM> = {
    headers: [
      {
        columnDef: 'date',
        header: 'Fecha',
        cell: (element: { [key: string]: string }) => `${element['date']}`,
      },
      {
        columnDef: 'time',
        header: 'Hora',
        cell: (element: { [key: string]: string }) => `${element['time']}`,
      },
      {
        columnDef: 'subject',
        header: 'Descripción',
        cell: (element: { [key: string]: string }) => `${element['subject']}`,
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
          `${element['patient']['user']['firstName']} ${element['patient']['user']['lastName']}`,
      },
      {
        columnDef: 'patinetConfirm',
        header: 'Estado',
        cell: (element: { [key: string]: string }) =>
          `${element['patientConfirm']}`,
      },
    ],
    body: [],
    options: [],
  };

  sub$ = new Subscription();
  reportForm!: FormGroup;
  disableDateSubmit = true;
  loading = false;
  indexes: number[] = [];
  role!: any;
  constructor(
    private matDialog: MatDialog,
    private citeService: CiteService,
    private tableService: TableService,
    private stateService: StateService,
    private userState: UserStateService
  ) {}
  ngOnInit(): void {
    this.role = this.userState.getRole();
    this.sub$.add(
      this.citeService.getLoading$().subscribe((loading) => {
        this.loading = loading;
        this.stateService.setLoading(loading);
      })
    );
    this.sub$.add(
      this.roleBasedData().subscribe((cite: CiteItemVM[] | null) => {
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
    modal.componentInstance.closed.subscribe(() => {
      modal.close();
    });
  }

  showConfirm(cite: CiteItemVM): void {
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Cita',
          body: `¿Está seguro que desea eliminar la cita del día <strong>${cite.date}</strong>?`,
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

  private roleBasedData(): Observable<CiteItemVM[] | null> {
    const roleData = this.userState.getFullRole();
    if (roleData) {
      switch (this.role) {
        case 'asistente': {
          return this.citeService.findByDoctorId$(roleData.doctor.id);
          break;
        }
        case 'doctor': {
          return this.citeService.findByDoctorId$(roleData.id);
          break;
        }
        case 'paciente': {
          return this.citeService.findByPatient$(roleData.id);
          break;
        }
        default: {
          this.citeService.get({});
          return this.citeService.getData$();
        }
      }
    } else return new Observable<null>();
  }
}
