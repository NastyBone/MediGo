import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.parent?.get('newPassword');
  const confirmPassword = control.parent?.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value
    ? null
    : { passwordNotMatch: true };
};
