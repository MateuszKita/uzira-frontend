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

  login(body: UserLoginData): Observable<any> {
    return this.http.post<any>('localhost:8000/login/', body);
  }

  register(body: UserRegisterData): Observable<any> {
    return this.http.post<any>('localhost:8000/user/', body);
  }
}
