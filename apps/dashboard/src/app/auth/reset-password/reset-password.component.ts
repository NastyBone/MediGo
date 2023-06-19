import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { passwordMatchValidator } from '../../common/password-match-validator.directive';
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'medigo-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form!: FormGroup;
  sub$ = new Subscription();
  submitDisable = true;
  loading = false;
  initToken = true;
  hidePassword = true;
  hideConfirm = true;

  ngOnInit(): void {
    this.createForm();
    this.checkToken();
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  getDataFromResetPassword(): void {
    this.loading = true;
    this.sub$.add(
      this.resetPasswordService
        .exec(
          { newPassword: this.form.value.password },
          this.activatedRoute.snapshot.params['token']
        )
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: () => {
            this._snackBar.open(
              'Se ha cambiado la contraseña exitosamente, sera redirigido en breve',
              'Aceptar',
              { duration: 3000 }
            );
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
        })
    );
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      newPassword: [
        null,
        [
          Validators.maxLength(16),
          Validators.minLength(8),
          Validators.required,
          passwordMatchValidator,
        ],
      ],
      confirmPassword: [null, [Validators.required, passwordMatchValidator]],
    });
  }

  private checkToken(): void {
    const token = this.activatedRoute.snapshot.params['token'];
    this.sub$.add(
      this.resetPasswordService.init(token).subscribe({
        next: () => {
          return;
        },
        error: () => {
          this.submitDisable = true;
        },
      })
    );
    this.sub$.add(
      this.form.valueChanges.pipe().subscribe(() => {
        this.form.controls['newPassword'].updateValueAndValidity({
          onlySelf: true,
          emitEvent: true,
        });
        this.submitDisable = !(
          this.form.controls['newPassword'].valid &&
          this.form.controls['confirmPassword'].valid
        );
      })
    );
  }
}
