import { Injectable } from "@angular/core";
import { FormGroup, Validator } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MatchPasswords implements Validator {
  validate(form: FormGroup) {
    const {password, passwordConfirmation} = form.value;
    if(password === passwordConfirmation) {
      return null;
    } else {
      return {passwordsDontMatch: true}
    }
  }
}
