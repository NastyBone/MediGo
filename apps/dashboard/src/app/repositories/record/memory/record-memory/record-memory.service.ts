import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common/memory-repository/memory-repository';
import { RecordItemVM } from '../../model';

@Injectable()
export class RecordMemoryService extends MemoryRepository<RecordItemVM> {
  constructor() {
    super();
  }
}
