import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common';
import { AvailabilityItemVM } from '../../model';

@Injectable()
export class AvailabilityMemoryService extends MemoryRepository<AvailabilityItemVM> {
  constructor() {
    super();
  }
}
