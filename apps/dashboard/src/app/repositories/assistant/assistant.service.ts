import { Injectable } from '@angular/core';
import { CreateAssistantService } from './use-cases/create-assistant/create-assistant.service';
import { DeleteAssistantService } from './use-cases/delete-assistant/delete-assistant.service';
import { FindAssistantService } from './use-cases/find-assistant/find-assistant.service';
import { GetAssistantsService } from './use-cases/get-assistants/get-assistants.service';
import { UpdateAssistantService } from './use-cases/update-assistant/update-assistant.service';
import { AssistantMemoryService } from './memory';
import { ListComponentService } from '../../common/memory-repository/list-component.service';
import { AssistantItemVM } from './model';
import { FindByUserIdService } from './use-cases/find-by-user-id/find-by-user-id.service';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class AssistantService extends ListComponentService<AssistantItemVM> {
  constructor(
    public createAssistantService: CreateAssistantService,
    public deleteAssistantService: DeleteAssistantService,
    public findAssistantService: FindAssistantService,
    public getAssistantsService: GetAssistantsService,
    public updateAssistantService: UpdateAssistantService,
    public assistantsMemoryService: AssistantMemoryService,
    protected findAssistantByUserId: FindByUserIdService
  ) {
    super(
      getAssistantsService,
      assistantsMemoryService,
      deleteAssistantService,
      createAssistantService,
      updateAssistantService,
      findAssistantService
    );
  }

  findByUserId$(id: number): Observable<AssistantItemVM> {
    this.setLoading(true);
    return this.findAssistantByUserId
      .exec({ id })
      .pipe(finalize(() => this.setLoading(false)));
  }
}
