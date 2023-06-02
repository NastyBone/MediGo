/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowActionSpeciality, SpecialityItemVM } from '../model';
import { Speciality2SpecialityVM } from './speciality-2-speciality-vm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SpecialityItem2SpecialityItemVM(
  Speciality: any
): SpecialityItemVM {
  return {
    ...Speciality2SpecialityVM(Speciality),
    options: {
      options: [
        {
          name: 'Editar',
          value: RowActionSpeciality.update,
        },
        {
          name: 'Eliminar',
          value: RowActionSpeciality.delete,
        },
      ],
    },
  };
}
