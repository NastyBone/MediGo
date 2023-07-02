import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, lastValueFrom } from 'rxjs';
import {
  TableDataVM,
  TableService,
  OptionAction,
  ConfirmModalComponent,
  UserStateService,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (element: { [key: string]: string | any }) =>
          `${element['doctor']['user']['lastName']} ${element['doctor']['user']['firstName']}`,
      },
      {
        columnDef: 'patient',
        header: 'Paciente',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  role!: any;

  constructor(
    private matDialog: MatDialog,
    private recordService: RecordService,
    private tableService: TableService,
    private stateService: StateService,
    private userState: UserStateService
  ) { }
  ngOnInit(): void {
    this.role = this.userState.getRole();
    this.sub$.add(
      this.recordService.getLoading$().subscribe((loading) => {
        this.loading = loading;
        this.stateService.setLoading(loading);
      })
    );
    this.sub$.add(
      this.roleBasedData().subscribe((record: RecordItemVM[] | null) => {
        this.recordData = {
          ...this.recordData,
          body: record || [],
          options:
            this.role == 'asistente' || this.role == 'paciente'
              ? [{ name: 'Imprimir', value: 'print', icon: 'print' }]
              : [...this.recordData.options],
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
      case RowActionRecord.print:
        this.recordService
          .generateReport$(+option.data['id'])
          .subscribe((res) => window.open(res as string, '_blank'));
    }
  }

  showModal(id?: number): void {
    const modal = this.matDialog.open(FormComponent, {
      hasBackdrop: true,
      autoFocus: false,

      data: {
        id,
        fullRole: this.userState.getFullRole(),
        role: this.userState.getRole(),
      },
    });
    modal.componentInstance.closed.subscribe(() => {
      modal.close();
    });
  }

  showConfirm(record: RecordItemVM): void {
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Informe',
          body: `¿Está seguro que desea eliminar el informe?`,
        },
      },
      hasBackdrop: true,
      autoFocus: false,

    });

    dialogRef.componentInstance.closed.subscribe((res) => {
      dialogRef.close();
      if (res) {
        this.recordService.delete(record?.id || 0);
      }
    });
  }

  private roleBasedData(): Observable<RecordItemVM[] | null> {
    const roleData = this.userState.getFullRole();

    if (roleData) {
      switch (this.role) {
        case 'asistente': {
          return this.recordService.findByDoctorId$(roleData.doctor.id);
          break;
        }
        case 'doctor': {
          return this.recordService.findByDoctorId$(roleData.id);
          break;
        }
        case 'paciente': {
          return this.recordService.findByPatientId$(roleData.id);
          break;
        }
        default: {
          this.recordService.get({});
          return this.recordService.getData$();
        }
      }
    } else {
      return new Observable<null>();
    }
  }
}
