import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginGuard } from './auth-login.guard';
import { LoginComponent } from './login/login.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthLoginGuard],
  },
  {
    path: 'recovery-password',
    component: RecoveryPasswordComponent,
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthLoginGuard],
})
export class AuthRoutingModule {}
