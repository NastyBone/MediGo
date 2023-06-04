import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiteComponent } from './cite.component';

const routes: Routes = [
  {
    path: '',
    component: CiteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CiteRoutingModule {}
