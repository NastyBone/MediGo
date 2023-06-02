import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common';
import { SpecialityItemVM } from '../../model';

@Injectable()
export class SpecialityMemoryService extends MemoryRepository<SpecialityItemVM> {
  constructor() {
    super();
  }
}
