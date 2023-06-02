/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowActionRecord, RecordItemVM } from '../model';
import { Record2RecordVM } from './record-2-record-vm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RecordItem2RecordItemVM(Record: any): RecordItemVM {
  return {
    ...Record2RecordVM(Record),
    patient: Record.patient,
    doctor: Record.doctor,
    options: {
      options: [
        {
          name: 'Editar',
          value: RowActionRecord.update,
        },
        {
          name: 'Eliminar',
          value: RowActionRecord.delete,
        },
      ],
    },
  };
}
