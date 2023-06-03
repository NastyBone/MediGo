import { Injectable } from '@angular/core';
import { AssistantService } from '@medigo/dashboard-sdk';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map, tap } from 'rxjs';
import { AssistantItem2AssistantItemVM } from '../../mappers';
import { AssistantMemoryService } from '../../memory';
import { AssistantItemVM } from '../../model';

@Injectable()
export class GetAssistantsService
  implements UseCase<Array<AssistantItemVM> | null, BaseQuery>
{
  constructor(
    private assistantService: AssistantService,
    private memoryService: AssistantMemoryService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(data: BaseQuery): Observable<Array<AssistantItemVM> | null> {
    return this.assistantService.assistantControllerFindAll().pipe(
      map((res) => res.map(AssistantItem2AssistantItemVM)),
      tap((Assistant: AssistantItemVM[]) => {
        this.memoryService.setDataSource(Assistant);
      })
    );
  }
}
