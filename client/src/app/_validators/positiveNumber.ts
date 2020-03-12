import { AbstractControl, ValidatorFn } from '@angular/forms';

export function positiveNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const isNonPositive = Number(control.value) <= 0;
      return isNonPositive ? { nonPositive: { value: control.value } } : null;
    };
}
