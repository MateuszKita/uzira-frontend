import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { SecurityService } from './security.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UNAUTHORIZED } from 'http-status-codes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private readonly securityService: SecurityService,
    private readonly router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.securityService.getToken();
    let headers: any = {};
    if (req.method !== 'POST' && req.url.includes('/user/')) {
      headers = {
        Authorization: 'Bearer ' + this.securityService.getToken()
      };
    }
    const authRequest = req.clone({
      setHeaders: headers
    });
    return next.handle(authRequest).pipe(
      catchError((error, caught) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === UNAUTHORIZED
        ) {
          this.router.navigate(['login']);
          // this.securityService.authorize();
        }
        return empty(); // Observable without events
        // return throwError(new Error(error.error.error.message));
      })
    );
  }
}
