/* eslint-disable @typescript-eslint/no-explicit-any */
import { AvailabilityVM } from '../model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Availability2AvailabilityVM(Availability: any): AvailabilityVM {
  return {
    id: Availability.id,
    start: Availability.start,
    end: Availability.end,
    day: Availability.day,
    available: Availability.available == 'Disponible' ? true : false,
    doctorId: Availability.doctor.id,
  };
}
