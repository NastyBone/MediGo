import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, forkJoin, map, startWith } from 'rxjs';
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
import { DoctorItemVM } from '../doctor/model';
import { PatientItemVM } from '../patient/model';
import { forbiddenNamesValidator } from '../../common/forbidden-names-validator.directive';


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
        header: 'Desde - Hasta',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (element: { [key: string]: string | any }) =>
          `${element['time.start']} - ${element['time.end']}`,
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
          `${element['doctor.user.lastName']} ${element['doctor.user.firstName']}`,
      },
      {
        columnDef: 'patient',
        header: 'Paciente',
        cell: (element: { [key: string]: string | any }) =>
          `${element['patient.user.firstName']} ${element['patient.user.lastName']}`,
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
  loading = false;
  indexes: number[] = [];
  role!: any;

  //
  doctorControl = new FormControl(null, {
    validators: [forbiddenNamesValidator],
  });
  incomingDoctors!: DoctorItemVM[];
  filteredDoctors!: Observable<DoctorItemVM[]>;
  disableSelectDoctor = false;
  //
  incomingPatients: PatientItemVM[] = [];
  patientControl = new FormControl(null, {
    validators: [forbiddenNamesValidator],
  });
  filteredPatients!: Observable<PatientItemVM[]>;
  disableSelectPatient = false;
  //
  selectable = [
    { name: 'Confirmada', value: 'true' },
    { name: 'No confirmada', value: 'false' },
  ];
  statusControl = new FormControl(null);
  //
  maxDate = new Date(2100, 11, 31);
  minDate = new Date(2000, 0, 1);
  reportForm!: FormGroup;
  disableDateSubmit = true;

  //
  constructor(
    private matDialog: MatDialog,
    private citeService: CiteService,
    private tableService: TableService,
    private stateService: StateService,
    private userState: UserStateService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.createReportForm();
    this.setRoleDefault()
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
    this.sub$.add(
      forkJoin({
        doctors: this.citeService.getDoctors$(),
        patients: this.citeService.getPatients$()
      }).subscribe(({ doctors, patients }) => {
        if (doctors) {
          this.incomingDoctors = doctors;
          this.filteredDoctors = this.doctorControl.valueChanges.pipe(
            startWith<string | DoctorItemVM | null | undefined>(''),
            map((value) => {
              if (value !== null) {
                return typeof value === 'string'
                  ? value
                  : value?.user?.firstName + ' ' + value?.user?.lastName;
              }
              return '';
            }),
            map((name) => {
              return name
                ? this._filterDoctors(name)
                : this.incomingDoctors.slice();
            })
          );
        }
        if (patients) {
          this.incomingPatients = patients;

          this.filteredPatients = this.patientControl.valueChanges.pipe(
            startWith<string | PatientItemVM | undefined | null>(''),
            map((value) => {
              if (value !== null) {
                return typeof value === 'string'
                  ? value
                  : value?.user?.firstName + ' ' + value?.user?.lastName;
              }
              return '';
            }),
            map((name) => {
              return name
                ? this._filterPatients(name)
                : this.incomingPatients.slice();
            })
          );
        }

      })
    )
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

  showConfirm(cite: CiteItemVM): void {
    const dialogRef = this.matDialog.open(ConfirmModalComponent, {
      data: {
        message: {
          title: 'Eliminar Cita',
          body: `¿Está seguro que desea eliminar la cita del día <strong>${cite.date}</strong>?`,
        },
      },
      hasBackdrop: true,
      autoFocus: false,
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

  createReportForm(): void {
    this.reportForm = this.formBuilder.group({
      doctor: this.doctorControl,
      patient: this.patientControl,
      status: this.statusControl,
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
    });

    this.sub$.add(
      this.reportForm.valueChanges.subscribe(() => {
        this.disableDateSubmit = !this.reportForm.valid;
      })
    );
  }

  private _filterDoctors(name: string): DoctorItemVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingDoctors.filter(
      (option) =>
        (option.user?.firstName + ' ' + option.user?.lastName)
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }

  private _filterPatients(name: string): PatientItemVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingPatients.filter(
      (option) =>
        (option.user?.firstName + ' ' + option.user?.lastName)
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }

  displayFn(item?: any): string {
    if (item) {
      if (item.name) return item.name;
      if (item.user?.firstName)
        return item.user.firstName + ' ' + item.user.lastName;
    }
    return '';
  }

  private setRoleDefault(): void {
    const role = this.userState.getRole();
    if (role == 'doctor') {
      this.doctorControl.patchValue(
        this.userState.getFullRole(),
        { emitEvent: true }
      );
      this.disableSelectDoctor = true;
    } else if (role == 'paciente') {
      this.patientControl.patchValue(
        this.userState.getFullRole(),
        { emitEvent: true }
      );
      this.disableSelectPatient = true;
    } else if (role == 'asistente') {
      this.doctorControl.patchValue(

        this.userState.getFullRole().doctor,

        { emitEvent: true }
      );
      this.disableSelectDoctor = true;
    }
  }

  //

  generate(): void {
    const data = this.reportForm.value
    this.citeService.report({ patientId: data.patient.id, doctorId: data.doctor.id, start: data.start, end: data.end, status: data.status }).subscribe((data) => {
      window.open(data.reportUrl)
    })
  }
}
