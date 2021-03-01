import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface usernameAvailableResponse {
  available: boolean;
}

interface signupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface signinCredentials {
  username: string;
  password: string;
}

interface signupResponse {
  username: string;
}

interface signinResponse {
  username: string;
}

interface signedinResponse {
  username: string;
  authenticated: boolean
}


// const URI = 'https://api.angular-email.com';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);
  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<{available: boolean}>(this.rootUrl + '/auth/username', {username})
  }

  signup(credentials: signupCredentials) {
    return this.http.post<{username: string}>(this.rootUrl + '/auth/signup', credentials, {
      // withCredentials: true //using auth interceptor
    }).pipe(
      tap(({username}) => {
        this.username = username;
        this.signedin$.next(true)
      })
    )
  }

  checkAuth() {
    return this.http.get<signedinResponse>(this.rootUrl + '/auth/signedin', {
      // withCredentials: true
    }).pipe(
      tap(({authenticated, username}) => {
          this.signedin$.next(authenticated);
          this.username = username;
      })
    )
  }

  signin(credentials: signinCredentials) {
    return this.http.post<signinResponse>(this.rootUrl + '/auth/signin', credentials).pipe(
      tap(({username}) => {
        this.signedin$.next(true)
        this.username = username
      })
    )
  }

  signout() {
    return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
      tap(() => this.signedin$.next(false))
    )
  }

}