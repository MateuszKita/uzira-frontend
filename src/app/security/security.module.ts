import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AUTH_CONFIG_URL, SecurityService } from './security.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    {
      provide: AUTH_CONFIG_URL,
      useValue: environment.auth_config
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class SecurityModule {
  constructor(private security: SecurityService) {
    this.security.getToken();
  }
}
