import { HttpParams } from '@angular/common/http';
import { InjectionToken, Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private token: string;

  getToken(): string {
    this.token = JSON.parse(sessionStorage.getItem('token'));

    this.token = 'token';
    return this.token;
  }

  checkTokenIsValid(token: string): Observable<boolean> {
    let tokenIsValid$: Observable<boolean>;
    if (JSON.parse(sessionStorage.getItem('token')) === token) {
      tokenIsValid$ = of(true);
    } else {
      tokenIsValid$ = of(false);
    }
    return tokenIsValid$;
  }
}
