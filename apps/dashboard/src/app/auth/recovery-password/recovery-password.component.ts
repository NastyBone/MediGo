import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, finalize } from 'rxjs';
import { StateService } from '../../common/state';
import { RecoveryPasswordService } from './recovery-password.service';

@Component({
  selector: 'tecnops-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private recoveryPasswordService: RecoveryPasswordService,
    private _snackBar: MatSnackBar,
    private stateService: StateService
  ) {}

  form!: FormGroup;
  submitDisable = true;
  loading = false;
  loginSuccess = false;
  private sub$ = new Subscription();

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  getDataFromRecoveryPassword(): void {
    this.loading = true;
    this.stateService.setLoading(this.loading);
    this.sub$.add(
      this.recoveryPasswordService
        .exec(this.form.value.email)
        .pipe(
          finalize(() => {
            this.loading = false;
            this.stateService.setLoading(this.loading);
          })
        )
        .subscribe({
          next: () => {
            this._snackBar.open(
              'Se ha enviado un mensaje de recuperacion a su correo exitosamente',
              'Cerrar'
            );
          },
        })
    );
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: [
        null,
        [Validators.email, Validators.required, Validators.maxLength(256)],
      ],
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisable = !this.form.valid;
      })
    );
  }
}
