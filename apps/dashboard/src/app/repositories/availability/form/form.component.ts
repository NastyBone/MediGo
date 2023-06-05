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

  //
  incomingDoctors!: DoctorItemVM[];
  selectedDoctor!: DoctorItemVM[];
  doctorControl = new FormControl(this.oldAvailabilityValue.doctor, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredDoctors!: Observable<DoctorItemVM[]>;
  //

  constructor(
    private availabilityService: AvailabilityService,
    @Inject(MAT_DIALOG_DATA) public data: AvailabilityItemVM,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    //
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
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
      day: [null, [Validators.required]],
      available: [false, [Validators.required]],
      doctor: this.doctorControl,
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisabled =
          isEqual(this.oldAvailabilityValue, this.form.getRawValue()) ||
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
        this.availabilityService
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
        this.availabilityService
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
}
