import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssistantRoutingModule } from './assistant-routing.module';
import { AssistantComponent } from './assistant.component';
import { AssistantService } from './assistant.service';
import { CreateAssistantService } from './use-cases/create-assistant/create-assistant.service';
import { FindAssistantService } from './use-cases/find-assistant/find-assistant.service';
import { GetAssistantsService } from './use-cases/get-assistants/get-assistants.service';
import { FindByUserIdService } from './use-cases/find-by-user-id/find-by-user-id.service';
import { UpdateAssistantService } from './use-cases/update-assistant/update-assistant.service';
import { DeleteAssistantService } from './use-cases/delete-assistant/delete-assistant.service';
import { FormComponent } from './form/form.component';
import { AssistantMemoryService } from './memory';

@NgModule({
  declarations: [AssistantComponent, FormComponent],
  imports: [CommonModule, AssistantRoutingModule],
  providers: [
    AssistantService,
    CreateAssistantService,
    FindAssistantService,
    GetAssistantsService,
    FindByUserIdService,
    UpdateAssistantService,
    DeleteAssistantService,
    AssistantMemoryService,
  ],
})
export class AssistantModule {}
