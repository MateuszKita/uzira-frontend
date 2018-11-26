import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserLoginData, UserRegisterData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private token: string;

  constructor(private readonly http: HttpClient) {}

  getToken(): string {
    this.token = JSON.parse(sessionStorage.getItem('token'));
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
