/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowActionDoctor, DoctorItemVM } from '../model';
import { Doctor2DoctorVM } from './doctor-2-doctor-vm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Doctor2DoctorItemVM(Doctor: any): DoctorItemVM {
  try {
    if (!Doctor) throw Error();
  } catch (e) {
    throw new Error('Usuario no ha sido asignado como doctor');
  }
  return {
    ...Doctor2DoctorVM(Doctor),
    user: Doctor.user,
    speciality: Doctor.speciality,
    options: {
      options: [
        {
          name: 'Editar',
          value: RowActionDoctor.update,
        },
        {
          name: 'Eliminar',
          value: RowActionDoctor.delete,
        },
      ],
    },
  };
}
