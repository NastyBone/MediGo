import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import {
  Observable,
  Subscription,
  finalize,
  forkJoin,
  map,
  startWith,
} from 'rxjs';
import { StateService } from '../../../common/state';
import { RecordItemVM } from '../model';
import { RecordService } from '../record.service';
import { forbiddenNamesValidator } from '../../../common/forbidden-names-validator.directive';
import { DoctorItemVM } from '../../doctor/model';
import { PatientItemVM } from '../../patient/model';

@Component({
  selector: 'medigo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Output()
  closed = new EventEmitter();
  id?: number;
  submitDisabled = true;
  sub$ = new Subscription();
  oldRecordValue: RecordItemVM = {
    date: '',
    description: '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doctorId: null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    patientId: null as any,
  };

  form!: FormGroup;
  loading = false;

  //
  incomingDoctors!: DoctorItemVM[];
  selectedDoctor!: DoctorItemVM[];
  doctorControl = new FormControl(this.oldRecordValue.doctor, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredDoctors!: Observable<DoctorItemVM[]>;
  //
  //
  incomingPatients!: PatientItemVM[];
  selectedPatients!: PatientItemVM[];
  patientControl = new FormControl(this.oldRecordValue.patient, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredPatients!: Observable<PatientItemVM[]>;
  //

  maxDate = new Date(2100, 11, 31);
  minDate = new Date(2000, 0, 1);
  dateControl = new FormControl(this.oldRecordValue.date, Validators.required);

  constructor(
    private recordService: RecordService,
    @Inject(MAT_DIALOG_DATA) public data: RecordItemVM,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    //
    this.sub$.add(
      forkJoin({
        patients: this.recordService.getPatients$(),
        doctors: this.recordService.getDoctors$(),
      }).subscribe(({ doctors, patients }) => {
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
        //
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
      })
    );
    //
    this.createForm();
    if (this.data?.id) {
      this.sub$.add(
        this.recordService
          .find$({ id: this.data.id })
          .pipe(
            finalize(() => {
              this.loading = false;
              this.stateService.setLoading(this.loading);
            })
          )
          .subscribe((record) => {
            if (record) {
              this.dateControl.setValue(this.dateFix(record.date));
              record.date = this.dateControl.value || record.date;
              this.oldRecordValue = record;
              this.form.patchValue(
                {
                  ...record,
                },
                {
                  emitEvent: false,
                }
              );
            }
          })
      );
    }
    this.loading = false;
    this.stateService.setLoading(this.loading);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  clickClosed(): void {
    this.closed.emit();
  }
  private createForm(): void {
    this.form = this.formBuilder.group({
      date: this.dateControl,
      description: [null, [Validators.required, Validators.maxLength(256)]],
      doctor: this.doctorControl,
      patient: this.patientControl,
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisabled =
          isEqual(this.oldRecordValue, this.form.getRawValue()) ||
          this.form.invalid;
      })
    );
  }

  clickSave(): void {
    if (this.data.id) {
      this.update();
    } else {
      this.create();
    }
  }
  private create(): void {
    if (!this.submitDisabled) {
      this.sub$.add(
        this.recordService
          .create({
            ...this.form.value,
          })
          .pipe(
            finalize(() => {
              this.form.reset();
              this.clickClosed();
            })
          )
          .subscribe()
      );
    }
  }

  private update(): void {
    if (!this.submitDisabled) {
      this.sub$.add(
        this.recordService
          .update({
            ...this.form.value,
            id: this.data.id,
          })
          .pipe(
            finalize(() => {
              this.form.reset();
              this.clickClosed();
            })
          )
          .subscribe()
      );
    }
  }
  //
  displayFn(item?: any): string {
    if (item) {
      if (item.firstName) return item.firstName + ' ' + item.lastName;
      if (item.user.firstName)
        return item.user.firstName + ' ' + item.user.lastName;
    }
    return '';
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
  //
  private _filterDoctors(name: string): DoctorItemVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingDoctors.filter(
      (option) =>
        (option.user?.firstName + ' ' + option.user?.lastName)
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }
  //
  private dateFix(date: string) {
    const [day, month, year] = date.split('/');
    return new Date(+year, +month - 1, +day, 0, 0, 0).toISOString();
  }
}
