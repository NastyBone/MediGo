/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailabilityVM } from '../../availability/model';

import { Availability2AvailabilityVM } from '../../availability/mappers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CiteItem2AvailabilityItemVM(Cite: any): AvailabilityVM {
  return {
    ...Availability2AvailabilityVM(Cite.time),
  };
}
