import { Injectable } from '@angular/core';
import { BaseQuery } from '../../../../common';
import { Observable, map } from 'rxjs';
import { Assistant2AssistantVM } from '../../mappers';
import { AssistantVM } from '../../model';
import { AssistantService } from '@medigo/dashboard-sdk';

@Injectable()
export class FindByUserIdService {
  constructor(private assistantService: AssistantService) {}

  exec(data: BaseQuery): Observable<AssistantVM | null> {
    return this.assistantService
      .assistantControllerFindByUserId(data?.id || 0) //ERROR
      .pipe(map(Assistant2AssistantVM));
  }
}
