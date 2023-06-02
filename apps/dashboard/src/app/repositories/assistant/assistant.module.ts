import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistantRoutingModule } from './assistant-routing.module';
import { AssistantComponent } from './assistant.component';


@NgModule({
  declarations: [
    AssistantComponent
  ],
  imports: [
    CommonModule,
    AssistantRoutingModule
  ]
})
export class AssistantModule { }
