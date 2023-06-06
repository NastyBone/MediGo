import { Injectable } from '@angular/core';

import { MemoryRepository } from '../../../../common/memory-repository/memory-repository';
import { AvailabilityItemVM } from '../../model';

@Injectable()
export class AvailabilityMemoryService extends MemoryRepository<AvailabilityItemVM> {
  constructor() {
    super();
  }
}
