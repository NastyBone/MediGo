import { AbstractControl, ValidationErrors } from '@angular/forms';

export function forbiddenNamesValidator(
  control: AbstractControl
): ValidationErrors | null {
  return control && control.value && !control.value.id
    ? { forbiddenNames: true }
    : null;
}
