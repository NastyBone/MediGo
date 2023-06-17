/* eslint-disable @typescript-eslint/no-explicit-any */
import { PatientItemVM } from '../../patient/model';
import { PatientItem2PatientItemVM } from '../../patient/mappers/patient-2-patient-item-vm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CiteItem2PatientItemVM(Cite: any): PatientItemVM {
  return {
    ...PatientItem2PatientItemVM(Cite.Patient),
  };
}
