/* eslint-disable @typescript-eslint/no-explicit-any */
import { DoctorVM } from '../model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Doctor2DoctorVM(Doctor: any): DoctorVM {
  return {
    id: Doctor.id,
    phone: Doctor.phone,
    specialityId: Doctor.speciality.id,
    userId: Doctor.user.id,
  };
}
