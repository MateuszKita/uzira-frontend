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
    return this.token;
  }

  login(): Observable<any> {
    return this.http.get<any>('localhost:8000/login');
  }
}
