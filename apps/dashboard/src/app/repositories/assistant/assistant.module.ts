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
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from '../../common';
import { DoctorModule } from '../doctor/doctor.module';
import { UsersModule } from '../users/users.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [AssistantComponent, FormComponent],
  imports: [
    CommonModule,
    AssistantRoutingModule,
    TableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    DoctorModule,
    UsersModule,
  ],
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
