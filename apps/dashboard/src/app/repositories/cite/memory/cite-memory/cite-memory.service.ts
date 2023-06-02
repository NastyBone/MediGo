import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common';
import { CiteItemVM } from '../../model';

@Injectable()
export class CiteMemoryService extends MemoryRepository<CiteItemVM> {
  constructor() {
    super();
  }
}
