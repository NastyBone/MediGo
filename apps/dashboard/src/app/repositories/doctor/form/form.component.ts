import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { Subscription, finalize } from 'rxjs';
import { StateService } from '../../../common/state';
import { DoctorService } from '../doctor.service';
import { DoctorVM } from '../model';

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
  oldDoctorValue: DoctorVM = {
    phone: '',
    specialityId: 0,
    userId: 0,
  };

  form!: FormGroup;
  loading = false;

  constructor(
    private doctorService: DoctorService,
    @Inject(MAT_DIALOG_DATA) public data: DoctorVM,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
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
      //TODO: Fix
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
}
