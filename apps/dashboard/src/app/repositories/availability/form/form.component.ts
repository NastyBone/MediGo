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
import { AvailabilityService } from '../availability.service';
import { AvailabilityItemVM } from '../model';
import { forbiddenNamesValidator } from '../../../common/forbidden-names-validator.directive';
import { DoctorItemVM } from '../../doctor/model';
import { DAYS } from '../days/days';
import { DayVM } from '../days/day-vm';
import { TimeConflictValidator } from '../../../common/time-conflict-validator.directive';
import { TimeRangeCheck } from '../../../common/time-range-validator.directive';

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
  oldAvailabilityValue: AvailabilityItemVM = {
    start: '',
    end: '',
    day: '',
    available: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doctorId: null as any,
  };

  form!: FormGroup;
  loading = false;

  selectable = [
    { name: 'No Disponible', value: 'false' },
    { name: 'Disponible', value: 'true' },
  ];
  availableSelect!: string;
  selected!: string;

  //
  incomingDoctors!: DoctorItemVM[];
  doctorControl = new FormControl(this.oldAvailabilityValue.doctor, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredDoctors!: Observable<DoctorItemVM[]>;
  disableSelectDoctor = false;
  //
  days: Array<DayVM> = DAYS;
  selectedDay!: DayVM[];
  dayControl = new FormControl(this.oldAvailabilityValue.day, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredDays!: Observable<DayVM[]>;
  //

  constructor(
    private availabilityService: AvailabilityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    //
    if (this.days) {
      this.filteredDays = this.dayControl.valueChanges.pipe(
        startWith<string | DayVM | null | undefined>(''),
        map((value) => {
          if (value !== null) {
            return typeof value === 'string' ? value : value?.name;
          }
          return '';
        }),
        map((name) => {
          return name ? this._filterDays(name) : this.days.slice();
        })
      );
    }
    //
    if (this.data.role == 'administrador') {
      this.sub$.add(
        this.availabilityService.getDoctors$().subscribe((doctors) => {
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
    }

    //
    this.createForm();
    if (this.data?.id) {
      this.sub$.add(
        this.availabilityService
          .find$({ id: this.data.id })
          .pipe(
            finalize(() => {
              this.loading = false;
              this.stateService.setLoading(this.loading);
            })
          )
          .subscribe((availability) => {
            if (availability) {
              this.oldAvailabilityValue = availability;
              this.form.patchValue(
                {
                  ...availability,
                  day: this.days.find((day) => day.name === availability.day),
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
    //
    this.form = this.formBuilder.group({
      start: [
        null,
        [
          Validators.required,
          TimeRangeCheck,
          TimeConflictValidator(this.data.availabilities),
        ],
      ],
      end: [
        null,
        [
          Validators.required,
          TimeRangeCheck,
          TimeConflictValidator(this.data.availabilities),
        ],
      ],
      day: this.dayControl,
      available: [true, [Validators.required]],
      doctor: this.doctorControl,
    });
    this.setDoctorDefault();
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.form.controls['end'].updateValueAndValidity({
          onlySelf: true,
          emitEvent: true,
        });

        this.form.controls['start'].updateValueAndValidity({
          onlySelf: true,
          emitEvent: true,
        });

        this.submitDisabled =
          isEqual(this.oldAvailabilityValue, this.form.getRawValue()) ||
          this.form.invalid;
      })
    );
  }

  clickSave(): void {
    this.form.value.available == 'true' || this.form.value.available == true
      ? (this.form.value.available = true)
      : (this.form.value.available = false);
    if (this.data.id) {
      this.update();
    } else {
      this.create();
    }
  }
  private create(): void {
    if (!this.submitDisabled) {
      this.sub$.add(
        this.availabilityService
          .create({
            ...this.form.value,
            doctorId: this.doctorControl.value?.id,
            day: this.dayControl.value.name,
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
        this.availabilityService
          .update({
            ...this.form.value,
            doctorId: this.doctorControl.value?.id,
            day: this.dayControl.value.name,
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
      if (item.name) return item.name;
      if (item.firstName) return item.firstName + ' ' + item.lastName;
      if (item.user.firstName)
        return item.user.firstName + ' ' + item.user.lastName;
    }
    return '';
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
  private _filterDays(name: string): DayVM[] {
    const filterValue = name.toLowerCase();
    return this.days.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareObjects(o1: any, o2: any): boolean {
    o1 == 'false' ? (o1 = false) : (o1 = true);
    o2 == 'false' ? (o2 = false) : (o2 = true);
    return o1 === o2;
  }

  private setDoctorDefault(): void {
    const role = this.data.role;
    if (role == 'doctor') {
      this.form.patchValue({
        doctor: this.data.fullRole,
      });
      this.disableSelectDoctor = true;
    }
  }
}
