import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ValidatorEmail(
    control: AbstractControl
): ValidationErrors | null {
    if (!isValidEmail(control.value)) {
        return { validEmail: true };
    }
    return null;
}

export function isValidEmail(email: string) {
    const regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexp.test(email);
}
