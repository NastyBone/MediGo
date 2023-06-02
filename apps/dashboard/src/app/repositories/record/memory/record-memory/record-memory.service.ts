import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common';
import { RecordItemVM } from '../../model';

@Injectable()
export class RecordMemoryService extends MemoryRepository<RecordItemVM> {
  constructor() {
    super();
  }
}
