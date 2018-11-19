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

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private securityService: SecurityService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.securityService.getToken();
    const authRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.securityService.getToken()
      }
    });
    return next.handle(authRequest).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // this.securityService.authorize();
        }
        return empty(); // Observable without events
        // return throwError(new Error(error.error.error.message));
      })
    );
  }
}
