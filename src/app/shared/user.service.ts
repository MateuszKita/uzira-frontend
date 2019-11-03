import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/user/');
  }
}
