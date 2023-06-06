import { Injectable } from '@angular/core';
import { UseCase, BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { AssistantItem2AssistantItemVM } from '../../mappers';
import { AssistantItemVM } from '../../model';
import { AssistantService } from '@medigo/dashboard-sdk';

@Injectable()
export class FindAssistantService
  implements UseCase<AssistantItemVM | null, BaseQuery>
{
  constructor(private assistantService: AssistantService) {}

  exec(data: BaseQuery): Observable<AssistantItemVM | null> {
    return this.assistantService
      .assistantControllerFindOne(data?.id || 0) //ERROR
      .pipe(map(AssistantItem2AssistantItemVM));
  }
}
