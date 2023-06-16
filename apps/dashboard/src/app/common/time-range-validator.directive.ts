import { AbstractControl, ValidatorFn } from '@angular/forms';
import { checkTimeRange } from '@medigo/time-handler';

export const TimeRangeCheck: ValidatorFn = (control: AbstractControl) => {
  const start = control.parent?.get('start');
  const end = control.parent?.get('end');

  const valid = checkTimeRange(start?.value, end?.value);

  if (start?.touched && end?.touched) {
    return valid ? null : { timeRangeError: true };
  }
  return null;
};
