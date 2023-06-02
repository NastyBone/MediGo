import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistantRoutingModule } from './assistant-routing.module';
import { AssistantComponent } from './assistant.component';
import { AssistantService } from './assistant.service';

@NgModule({
  declarations: [AssistantComponent],
  imports: [CommonModule, AssistantRoutingModule],
  providers: [AssistantService],
})
export class AssistantModule {}
