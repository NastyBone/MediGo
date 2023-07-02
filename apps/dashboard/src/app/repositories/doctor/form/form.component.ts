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
import { DoctorService } from '../doctor.service';
import { DoctorItemVM } from '../model';
import { forbiddenNamesValidator } from '../../../common/forbidden-names-validator.directive';
import { UserPatientVM } from '../../users/model';
import { SpecialityItemVM } from '../../speciality/model';

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
  oldDoctorValue: DoctorItemVM = {
    phone: '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    specialityId: null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: null as any,
  };
  specialityId!: number;
  userId!: number;

  form!: FormGroup;
  loading = false;

  //
  incomingUsers!: UserPatientVM[];
  userControl = new FormControl(this.oldDoctorValue.user, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredUsers!: Observable<UserPatientVM[]>;
  //
  incomingSpecialities!: SpecialityItemVM[];
  selectedSpeciality!: SpecialityItemVM[];
  specialityControl = new FormControl(this.oldDoctorValue.speciality, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredSpeciality!: Observable<SpecialityItemVM[]>;
  //

  constructor(
    private doctorService: DoctorService,
    @Inject(MAT_DIALOG_DATA) public data: DoctorItemVM,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    //
    this.sub$.add(
      forkJoin({
        users: this.doctorService.getUsers$(),
        specialities: this.doctorService.getSpecialities$(),
      }).subscribe(({ users, specialities }) => {
        if (users) {
          this.incomingUsers = users;
          this.filteredUsers = this.userControl.valueChanges.pipe(
            startWith<string | UserPatientVM | undefined | null>(''),
            map((value) => {
              if (value !== null) {
                return typeof value === 'string'
                  ? value
                  : value?.firstName + ' ' + value?.lastName;
              }
              return '';
            }),
            map((name) => {
              return name
                ? this._filterUsers(name)
                : this.incomingUsers.slice();
            })
          );
        }
        //
        if (specialities) {
          this.incomingSpecialities = specialities;
          this.filteredSpeciality = this.specialityControl.valueChanges.pipe(
            startWith<string | SpecialityItemVM | null | undefined>(''),
            map((value) => {
              if (value !== null) {
                return typeof value === 'string' ? value : value?.name;
              }
              return '';
            }),
            map((name) => {
              return name
                ? this._filteredSpecialities(name)
                : this.incomingSpecialities.slice();
            })
          );
        }
      })
    );
    //
    this.createForm();
    if (this.data?.id) {
      this.sub$.add(
        this.doctorService
          .find$({ id: this.data.id })
          .pipe(
            finalize(() => {
              this.loading = false;
              this.stateService.setLoading(this.loading);
            })
          )
          .subscribe((doctor) => {
            if (doctor) {
              this.oldDoctorValue = doctor;
              this.form.patchValue(
                {
                  ...doctor,
                  userId: doctor.user,
                  specialityId: doctor.speciality,
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
    this.form.reset();
  }
  private createForm(): void {
    this.form = this.formBuilder.group({
      phone: [null, [Validators.required, Validators.maxLength(18)]],
      specialityId: this.specialityControl,
      userId: this.userControl,
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisabled =
          isEqual(this.oldDoctorValue, this.form.getRawValue()) ||
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
        this.doctorService
          .create({
            ...this.form.value,
            specialityId: this.specialityControl.getRawValue()?.id,
            userId: this.userControl.getRawValue()?.id,
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
        this.doctorService
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  displayFn(item?: any): string {
    if (item) {
      if (item.name) return item.name;
      if (item.firstName) return item.firstName + ' ' + item.lastName;
      if (item.user.firstName)
        return item.user.firstName + ' ' + item.user.lastName;
    }
    return '';
  }

  private _filterUsers(name: string): UserPatientVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingUsers.filter(
      (option) =>
        (option.firstName + ' ' + option.lastName)
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }
  //
  private _filteredSpecialities(name: string): SpecialityItemVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingSpecialities.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
  //
}
