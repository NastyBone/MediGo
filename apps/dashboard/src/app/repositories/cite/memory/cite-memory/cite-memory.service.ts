import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common/memory-repository/memory-repository';
import { CiteItemVM } from '../../model';

@Injectable()
export class CiteMemoryService extends MemoryRepository<CiteItemVM> {
  constructor() {
    super();
  }
}
