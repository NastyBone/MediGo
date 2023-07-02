import { AbstractControl, ValidatorFn } from '@angular/forms';
import { checkTimeConflict } from '@medigo/time-handler';
import { AvailabilityVM } from '../repositories/availability/model';
export const TimeConflictValidator: ValidatorFn | any = (
  data: AvailabilityVM[]
) => {
  return (control: AbstractControl) => {
    const start = control.parent?.get('start')?.value;
    const end = control.parent?.get('end')?.value;
    const day = control.parent?.get('day')?.value?.name;
    const doctorId = control.parent?.get('doctor')?.value?.id;
    if (day && start && end && doctorId) {
      const valid = checkTimeConflict(start, end, day, doctorId, data);
      return valid ? null : { timeConflictError: true };
    }
    return null;
  };
};
