import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiteRoutingModule } from './cite-routing.module';
import { CiteComponent } from './cite.component';


@NgModule({
  declarations: [
    CiteComponent
  ],
  imports: [
    CommonModule,
    CiteRoutingModule
  ]
})
export class CiteModule { }
