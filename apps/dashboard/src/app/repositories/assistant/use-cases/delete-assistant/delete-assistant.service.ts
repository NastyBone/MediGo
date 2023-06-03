import { Injectable } from '@angular/core';
import { AssistantService } from '@medigo/dashboard-sdk';
import { UseCase } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { AssistantMemoryService } from '../../memory';

@Injectable()
export class DeleteAssistantService implements UseCase<number, number> {
  constructor(
    private assistantService: AssistantService,
    private memoryService: AssistantMemoryService
  ) {}

  exec(id: number): Observable<number> {
    return this.assistantService.assistantControllerRemove(id).pipe(
      map(() => 1),
      tap(() => {
        this.memoryService.delete(id);
      })
    );
  }
}
