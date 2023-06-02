import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common';
import { AssistantItemVM } from '../../model';

@Injectable()
export class AssistantMemoryService extends MemoryRepository<AssistantItemVM> {
  constructor() {
    super();
  }
}
