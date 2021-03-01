import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { skipWhile, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authSerivce: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authSerivce.signedin$.pipe(
        skipWhile(value =>  value === null),
        take(1),
        tap((authentecated) => {
          if(!authentecated) {
            this.router.navigateByUrl('/');
          }
        })
      )

    // return new Observable(subscriber => {
    //   subscriber.next(true),
    //   subscriber.complete()
    // });
  }
}
