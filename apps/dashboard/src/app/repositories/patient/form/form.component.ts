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
import { PatientItemVM } from '../model';
import { PatientService } from '../patient.service';
import { forbiddenNamesValidator } from '../../../common/forbidden-names-validator.directive';
import { UserVM } from '../../users/model';

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
  oldPatientValue: PatientItemVM = {
    address: '',
    phone: '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: null as any,
  };

  form!: FormGroup;
  loading = false;

  //
  incomingUsers!: UserVM[];
  userControl = new FormControl(this.oldPatientValue.user, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredUsers!: Observable<UserVM[]>;
  //

  constructor(
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: PatientItemVM,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    //
    this.sub$.add(
      this.patientService.getUsers$().subscribe((users) => {
        if (users) {
          this.incomingUsers = users;
          this.filteredUsers = this.userControl.valueChanges.pipe(
            startWith<string | UserVM | undefined | null>(''),
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
      })
    );
    //

    this.createForm();
    if (this.data?.id) {
      this.sub$.add(
        this.patientService
          .find$({ id: this.data.id })
          .pipe(
            finalize(() => {
              this.loading = false;
              this.stateService.setLoading(this.loading);
            })
          )
          .subscribe((patient) => {
            if (patient) {
              this.oldPatientValue = patient;
              this.form.patchValue(
                {
                  ...patient,
                  userId: this.incomingUsers.find(
                    (user) => user.id == patient.user?.id
                  ),
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
      address: [null, [Validators.required, Validators.maxLength(256)]],
      phone: [null, [Validators.required, Validators.maxLength(20)]],
      userId: this.userControl,
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisabled =
          isEqual(this.oldPatientValue, this.form.getRawValue()) ||
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
        this.patientService
          .create({
            ...this.form.value,
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
        this.patientService
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
      if (item.firstName) return item.firstName + ' ' + item.lastName;
    }
    return '';
  }

  private _filterUsers(name: string): UserVM[] {
    const filterValue = name.toLowerCase();
    return this.incomingUsers.filter(
      (option) =>
        (option.firstName + ' ' + option.lastName)
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }
  //
}
