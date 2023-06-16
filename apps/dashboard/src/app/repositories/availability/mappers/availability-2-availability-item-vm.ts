/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowActionAvailability, AvailabilityItemVM } from '../model';
import { Availability2AvailabilityVM } from './availability-2-availability-vm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AvailabilityItem2AvailabilityItemVM(
  Availability: any
): AvailabilityItemVM {
  return {
    ...Availability2AvailabilityVM(Availability),
    doctor: Availability.doctor,
    available: Availability.available ? 'Disponible' : 'No Disponible',
    options: {
      options: [
        {
          name: 'Editar',
          value: RowActionAvailability.update,
        },
        {
          name: 'Eliminar',
          value: RowActionAvailability.delete,
        },
      ],
    },
  };
}
