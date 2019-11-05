import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security/security.service';
import { debounceTime, filter } from 'rxjs/operators';
import {
  Router,
  NavigationEnd,
  RouterEvent,
} from '@angular/router';

const LOGIN_URL = '/login';
const REGISTER_URL = '/register';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public menuIsVisible = true;

  constructor(
    private readonly securityService: SecurityService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.checkTokenValidityOnNavigate();
    this.changeMenuIsVisibleValue(this.router.url);
  }

  private checkTokenValidityOnNavigate(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: RouterEvent) => {
        if (
          !this.securityService.getToken() &&
          event.url !== LOGIN_URL &&
          event.url !== REGISTER_URL
        ) {
          this.router.navigate(['/login']);
        }
        this.changeMenuIsVisibleValue(event.url);
      });
  }

  private changeMenuIsVisibleValue(route: string): void {
    this.menuIsVisible = !(route === LOGIN_URL || route === REGISTER_URL);
  }
}
