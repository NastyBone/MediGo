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
import { Observable, Subscription, finalize, map, startWith } from 'rxjs';
import { StateService } from '../../../common/state';
import { RecordItemVM } from '../model';
import { RecordService } from '../record.service';
import { forbiddenNamesValidator } from '../../../common/forbidden-names-validator.directive';
import { DoctorItemVM } from '../../doctor/model';
import { PatientItemVM } from '../../patient/model';
import { dateFixFormat } from '@medigo/time-handler';

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
    date: dateFixFormat(new Date().toLocaleDateString()),
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
  selectedDoctorId!: number;
  doctorControl = new FormControl(this.oldRecordValue.doctor, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredDoctors!: Observable<DoctorItemVM[]>;
  disableSelectDoctor = false;
  //
  //
  incomingPatients: PatientItemVM[] = [];
  patientControl = new FormControl(this.oldRecordValue.patient, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredPatients!: Observable<PatientItemVM[]>;
  //
  //
  maxDate = new Date(2100, 11, 31);
  minDate = new Date(2000, 0, 1);
  dateControl = new FormControl(this.oldRecordValue.date, Validators.required);

  constructor(
    private recordService: RecordService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    //
    if (this.data.role == 'administrador') {
      this.loading = true;
      this.stateService.setLoading(this.loading);
      this.sub$.add(
        this.recordService
          .getDoctors$()
          .pipe(
            finalize(() => {
              this.loading = false;
              this.stateService.setLoading(this.loading);
            })
          )
          .subscribe((doctors) => {
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
    }

    //
    this.createForm();
    if (this.data?.id) {
      this.loading = true;
      this.stateService.setLoading(this.loading);
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
              this.selectedDoctorId = record.doctor?.id as number;

              this.dateControl.setValue(dateFixFormat(record.date));
              record.date = this.dateControl.value || record.date;
              this.oldRecordValue = record;
              this.form.patchValue(
                {
                  ...record,
                  doctorId: record.doctor,
                  patientId: record.patient,
                },
                {
                  emitEvent: false,
                }
              );
              this.loadPatients();
            }
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  clickClosed(): void {
    this.closed.emit();
    this.form.reset();
  }
  private createForm(): void {
    this.form = this.formBuilder.group({
      date: this.dateControl,
      description: [null, [Validators.required, Validators.maxLength(2000)]],
      doctorId: this.doctorControl,
      patientId: this.patientControl,
    });
    this.setRoleDefault();
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisabled =
          isEqual(this.oldRecordValue, this.form.getRawValue()) ||
          this.form.invalid;
      })
    );
    this.sub$.add(
      this.doctorControl.valueChanges.subscribe((doctor) => {
        if (doctor && doctor.id) {
          this.selectedDoctorId = doctor.id;
          this.loadPatients();
        }
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
            doctorId: this.doctorControl.getRawValue()?.id,
            patientId: this.patientControl.getRawValue()?.id,
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
            doctorId: this.doctorControl.getRawValue()?.id,
            patientId: this.patientControl.getRawValue()?.id,
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

  loadPatients(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    //
    this.sub$.add(
      this.recordService
        .getPatients$(this.selectedDoctorId)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(this.loading);
          })
        )
        .subscribe((patients) => {
          if (patients) {
            this.incomingPatients = this.removeDuplicates(patients);

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
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  private setRoleDefault(): void {
    const role = this.data.role;
    if (role == 'doctor') {
      this.form.patchValue(
        {
          doctorId: this.data.fullRole,
        },
        { emitEvent: true }
      );
      this.disableSelectDoctor = true;
      this.loadPatients();
    }
  }

  removeDuplicates(array: Array<any>): Array<any> {
    const uniqueIds = new Set();
    return array.filter((obj) => {
      if (uniqueIds.has(obj.id)) {
        return false;
      } else {
        uniqueIds.add(obj.id);
        return true;
      }
    });
  }
}
