import { AbstractControl, ValidationErrors } from '@angular/forms';

export class AuthValidator {
    static hasSpace(control: AbstractControl): ValidationErrors | null {
        if (control.value && (control.value as string).indexOf(' ') !== -1) {
            return {
                hasSpace: true
            };
        }
        return null;
    }
}
