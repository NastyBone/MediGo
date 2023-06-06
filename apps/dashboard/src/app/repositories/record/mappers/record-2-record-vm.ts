/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecordVM } from '../model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Record2RecordVM(Record: any): RecordVM {
  return {
    id: Record.id,
    date: Record.date,
    description: Record.description,
    doctorId: Record.doctor.id,
    patientId: Record.patient.id,
  };
}
