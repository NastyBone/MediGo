/* eslint-disable @typescript-eslint/no-explicit-any */
import { SpecialityVM } from '../model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Speciality2SpecialityVM(Speciality: any): SpecialityVM {
  return {
    id: Speciality.id,
    name: Speciality.name,
    description: Speciality.description,
  };
}
