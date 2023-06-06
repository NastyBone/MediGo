import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common/memory-repository/memory-repository';
import { AssistantItemVM } from '../../model';

@Injectable()
export class AssistantMemoryService extends MemoryRepository<AssistantItemVM> {
  constructor() {
    super();
  }
}
