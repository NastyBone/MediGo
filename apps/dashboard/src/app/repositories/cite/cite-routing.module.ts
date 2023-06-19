import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiteComponent } from './cite.component';
import { FormComponent } from './form/form.component';
import { UrlAccessGuardGuard } from '../../common/url-access-guard/url-access-guard.guard';
const routes: Routes = [
  {
    path: '',
    component: CiteComponent,
  },
  {
    path: 'form/:id',
    component: FormComponent,
    canActivate: [UrlAccessGuardGuard],
  },
  {
    path: 'form',
    component: FormComponent,
    canActivate: [UrlAccessGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CiteRoutingModule {}
