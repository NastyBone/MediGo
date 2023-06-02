/* eslint-disable @typescript-eslint/no-explicit-any */
import { PatientVM } from '../model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Patient2PatientVM(Patient: any): PatientVM {
  return {
    id: Patient.id,
    address: Patient.address,
    phone: Patient.phone,
    userId: Patient.userId,
  };
}
