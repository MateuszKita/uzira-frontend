import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private token: string;

  constructor(private readonly http: HttpClient) {}

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

  login(): Observable<any> {
    return this.http.get<any>('localhost:8000/login');
  }
}
