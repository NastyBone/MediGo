import { Injectable } from '@angular/core';
import { AssistantService } from '@medigo/dashboard-sdk';
import { AssistantMemoryService } from '../../memory';
import { AssistantItemVM, AssistantVM } from '../../model';
import { AssistantItem2AssistantItemVM } from '../../mappers';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class CreateAssistantService {
  constructor(
    private assistantService: AssistantService,
    private memoryService: AssistantMemoryService
  ) {}

  exec(AssistantSave: AssistantVM): Observable<AssistantItemVM | null> {
    return this.assistantService.assistantControllerCreate(AssistantSave).pipe(
      map(AssistantItem2AssistantItemVM),
      tap((assistant) => this.memoryService.create(assistant))
    );
  }
}
