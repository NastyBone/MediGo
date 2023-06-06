import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { Subscription, finalize } from 'rxjs';
import { StateService } from '../../../common/state';
import { CiteService } from '../cite.service';
import { CiteItemVM } from '../model';

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
  oldCiteValue: CiteItemVM = {
    subject: '',
    date: '',
    time: '',
    patientConfirm: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    doctorId: null as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    patientId: null as any,
  };

  form!: FormGroup;
  loading = false;

  constructor(
    private citeService: CiteService,
    @Inject(MAT_DIALOG_DATA) public data: CiteItemVM,
    private stateService: StateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    this.createForm();
    if (this.data?.id) {
      this.sub$.add(
        this.citeService
          .find$({ id: this.data.id })
          .pipe(
            finalize(() => {
              this.loading = false;
              this.stateService.setLoading(this.loading);
            })
          )
          .subscribe((cite) => {
            if (cite) {
              this.oldCiteValue = cite;
              this.form.patchValue(
                {
                  ...cite,
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
      subject: [null, [Validators.required, Validators.maxLength(256)]],
      date: [null, [Validators.required]], //TODO: Implementar DateControl
      time: [null, [Validators.required]],
      patientConfirm: [false, [Validators.required]],
      doctor: [null, [Validators.required]], //TODO: Implementar DoctorControl
      patient: [null, [Validators.required]], // TODO: Implementar PatientControl
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisabled =
          isEqual(this.oldCiteValue, this.form.getRawValue()) ||
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
        this.citeService
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
        this.citeService
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
