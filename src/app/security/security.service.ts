import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';

export const AUTH_CONFIG_URL = new InjectionToken<string>('Auth config url');

interface AuthConfig {
  auth_url: string;
  response_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private token: string;
  constructor(@Inject(AUTH_CONFIG_URL) private config: AuthConfig) {}

  authorize(): void {
    const { auth_url, response_type } = this.config;

    const p = new HttpParams({
      fromObject: {
        response_type
      }
    });

    const url = `${auth_url}?${p.toString()}`;
    sessionStorage.removeItem('token');
    location.replace(url);
  }

  getToken(): string {
    this.token = JSON.parse(sessionStorage.getItem('token'));

    if (!this.token && location.hash) {
      const params = new HttpParams({
        fromString: location.hash
      });
      this.token = params.get('#access_token');
      sessionStorage.setItem('token', JSON.stringify(this.token));
    }

    if (!this.token) {
      this.authorize();
    }
    return this.token;
  }
}
