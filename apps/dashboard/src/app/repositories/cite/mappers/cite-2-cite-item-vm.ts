/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowActionCite, CiteItemVM } from '../model';
import { Cite2CiteVM } from './cite-2-cite-vm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CiteItem2CiteItemVM(Cite: any): CiteItemVM {
  return {
    ...Cite2CiteVM(Cite),
    doctor: Cite.doctor,
    patient: Cite.patient,
    time: Cite.time,
    patientConfirm: Cite.patientConfirm ? 'Confirmada' : 'No confirmada',
    options: {
      options: [
        {
          name: 'Editar',
          value: RowActionCite.update,
        },
        {
          name: 'Eliminar',
          value: RowActionCite.delete,
        },
      ],
    },
  };
}
