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
import { AssistantService } from '../assistant.service';
import { AssistantItemVM } from '../model';
import { UserVM } from '../../users/model';
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
  oldAssistantValue: AssistantItemVM = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doctorId: null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userId: null as any,
  };

  form!: FormGroup;
  loading = false;

  //
  incomingUsers!: UserVM[];
  selectedUser!: UserVM[];
  userControl = new FormControl(this.oldAssistantValue.user, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredUsers!: Observable<UserVM[]>;
  //
  incomingDoctors!: DoctorItemVM[];
  selectedDoctor!: DoctorItemVM[];
  doctorControl = new FormControl(this.oldAssistantValue.doctor, {
    validators: [Validators.required, forbiddenNamesValidator],
  });
  filteredDoctors!: Observable<DoctorItemVM[]>;
  //

  constructor(
    private assistantService: AssistantService,
    @Inject(MAT_DIALOG_DATA) public data: AssistantItemVM,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    //
    this.sub$.add(
      forkJoin({
        users: this.assistantService.getUsers$(),
        doctors: this.assistantService.getDoctors$(),
      }).subscribe(({ users, doctors }) => {
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
        this.assistantService
          .find$({ id: this.data.id })
          .pipe(
            finalize(() => {
              this.loading = false;
              this.stateService.setLoading(this.loading);
            })
          )
          .subscribe((assistant) => {
            if (assistant) {
              this.oldAssistantValue = assistant;
              this.form.patchValue(
                {
                  ...assistant,
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
      doctor: this.doctorControl,
      user: this.userControl,
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisabled =
          isEqual(this.oldAssistantValue, this.form.getRawValue()) ||
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
        this.assistantService
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
        this.assistantService
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
