/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowActionPatient, PatientItemVM } from '../model';
import { Patient2PatientVM } from './patient-2-patient-vm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PatientItem2PatientItemVM(Patient: any): PatientItemVM {
  try {
    if (!Patient) throw Error();
  } catch (e) {
    throw new Error('Su usuario no ha sido asignado');
  }
  return {
    ...Patient2PatientVM(Patient),
    user: Patient.user,
    options: {
      options: [
        {
          name: 'Editar',
          value: RowActionPatient.update,
        },
        {
          name: 'Eliminar',
          value: RowActionPatient.delete,
        },
      ],
    },
  };
}
