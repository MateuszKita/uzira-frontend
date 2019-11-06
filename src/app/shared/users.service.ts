import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getMe(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'users/me');
  }
}
