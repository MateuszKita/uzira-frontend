import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLoginData, UserRegisterData } from '../models/user.model';
import { Router } from '@angular/router';

const LOGIN_URL = '/login';
const REGISTER_URL = '/register';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private token: string;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getToken(): string {
    const tokenObject: any = JSON.parse(sessionStorage.getItem('token'));
    if (tokenObject) {
      this.token = tokenObject.token;
    } else if (
      this.router.url !== LOGIN_URL &&
      this.router.url !== REGISTER_URL
    ) {
      this.router.navigate(['/login']);
    }
    return this.token;
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  login(body: UserLoginData): Observable<string> {
    return this.http.post<any>('http://localhost:8000/user/login/', body);
  }

  register(body: UserRegisterData): Observable<any> {
    const registerData: any = {
      email: body.email,
      password: body.password,
      first_name: body.firstName,
      last_name: body.lastName
    };
    return this.http.post<any>('http://localhost:8000/user/', registerData);
  }
}
