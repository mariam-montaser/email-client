import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl } from "@angular/forms";
import { Observable, throwError, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { AuthService } from "../auth.service";



@Injectable({
  providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

  constructor(private authService: AuthService) {}

  validate = (control: FormControl): Observable<{[key: string]: boolean}> => {
    const {value} = control;
    console.log(value);
    return this.authService.usernameAvailable(value).pipe(
      map(value => {
        // if(value.available) {
        //   return null;
        // }
        return null;
      }),
      catchError(error => {
        // return throwError(error)
        if(error.error.username) {
          return of({nonUniqueUsername: true})
        } else {
          return of({noConnection: true})
        }
      })
    )
  }
}
