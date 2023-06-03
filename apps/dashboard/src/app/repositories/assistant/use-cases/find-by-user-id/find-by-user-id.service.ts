import { Injectable } from '@angular/core';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { AssistantItem2AssistantItemVM } from '../../mappers';
import { AssistantItemVM } from '../../model';
import { AssistantService } from '@medigo/dashboard-sdk';

@Injectable()
export class FindByUserIdService {
  constructor(private assistantService: AssistantService) {}

  exec(data: BaseQuery): Observable<AssistantItemVM> {
    return this.assistantService
      .assistantControllerFindByUserId(data?.id || 0) //ERROR
      .pipe(map(AssistantItem2AssistantItemVM));
  }
}
