import { Injectable } from '@angular/core';
import { AssistantService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { AssistantItem2AssistantItemVM } from '../../mappers';
import { AssistantMemoryService } from '../../memory';
import { AssistantItemVM, AssistantVM } from '../../model';

@Injectable()
export class UpdateAssistantService
  implements UseCase<AssistantItemVM | null, AssistantVM>
{
  constructor(
    private assistantService: AssistantService,
    private memoryService: AssistantMemoryService
  ) {}

  exec(assistantSave: AssistantVM): Observable<AssistantItemVM | null> {
    return this.assistantService
      .assistantControllerUpdate(assistantSave, assistantSave.id || 0)
      .pipe(
        map(AssistantItem2AssistantItemVM),
        tap((assistant: AssistantItemVM) => {
          this.memoryService.update(assistant);
        })
      );
  }
}
