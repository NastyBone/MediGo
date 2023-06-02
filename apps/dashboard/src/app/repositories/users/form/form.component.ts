import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { finalize, Subscription } from 'rxjs';

import { StateService } from '../../state';
import { UsersService } from '../users.service';
import { UserVM } from '../model';

@Component({
  selector: 'sm-soc-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy, AfterContentChecked {
  @Output()
  closed = new EventEmitter();
  form!: FormGroup;
  selectable = [
    { name: 'Activo', value: 'false' },
    { name: 'Inactivo', value: 'true' },
  ];
  selected!: string;
  submitDisabled = true;
  sub$ = new Subscription();
  oldFormValue: UserVM = {
    name: '',
    email: '',
    status: false,
    role: '',
    id: 0,
  };
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private stateService: StateService,
    @Inject(MAT_DIALOG_DATA) public data: UserVM,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.sub$.add(
      this.usersService.getLoading$().subscribe((loading) => {
        this.stateService.setLoading(loading);
        this.loading = loading;
      })
    );
    this.createForm();
    if (this.data.id) {
      this.sub$.add(
        this.usersService.find$({ id: this.data.id }).subscribe((users) => {
          users?.status
            ? (this.selected = this.selectable[1].value)
            : (this.selected = this.selectable[0].value);

          if (users) {
            this.oldFormValue = users;
            this.form.patchValue(
              {
                ...users,
              },
              {
                emitEvent: false,
              }
            );
          }
        })
      );
    }
    return;
  }

  clickClosed(): void {
    this.closed.emit();
    this.form.reset();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      status: [false, [Validators.required]],
      id: [0],
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisabled =
          isEqual(this.oldFormValue, this.form.getRawValue()) ||
          this.form.invalid;
      })
    );
  }

  clickSave(): void {
    this.form.value.status == 'true'
      ? (this.form.value.status = true)
      : (this.form.value.status = false);
    if (this.data.id) {
      this.update();
    } else {
      this.create();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareObjects(o1: any, o2: any): boolean {
    o1 == 'false' ? (o1 = false) : (o1 = true);
    o2 == 'false' ? (o2 = false) : (o2 = true);
    return o1 === o2;
  }

  private create(): void {
    if (!this.submitDisabled) {
      this.sub$.add(
        this.usersService
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
        this.usersService
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
}
