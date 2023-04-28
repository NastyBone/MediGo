import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { StateService } from '../../common/state';
import { LoginService } from './login.service';

@Component({
  selector: 'tecnops-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stateService: StateService
  ) {
    this.stateService.setLoading(true);
    return;
  }
  form!: FormGroup;
  submitDisable = true;
  loading = false;
  hide = true;

  private sub$ = new Subscription();
  ngOnInit(): void {
    this.createForm();
    setTimeout(() => this.stateService.setLoading(false), 1000);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  getDataFromLogin(): void {
    this.loading = true;
    this.sub$.add(
      this.loginService
        .exec(this.form.value.email, this.form.value.password)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard'], {
              relativeTo: this.activatedRoute,
            });
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
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
    this.sub$.add(
      this.form.valueChanges.subscribe(() => {
        this.submitDisable = !this.form.valid;
      })
    );
  }
}
