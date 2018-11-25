import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security/security.service';
import { filter } from 'rxjs/operators';
import {
  Router,
  NavigationEnd,
  ActivatedRoute,
  RouterEvent
} from '@angular/router';

const LOGIN_URL = '/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public tokenIsValid = false;
  public menuIsVisible = true;
  private token: string;

  constructor(
    private readonly securityService: SecurityService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkTokenValidityOnNavigate();
  }

  private checkTokenValidityOnNavigate(): void {
    this.token = this.securityService.getToken();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        this.changeMenuIsVisibleValue(event.url);
      });
  }

  private changeMenuIsVisibleValue(route: string): void {
    this.menuIsVisible = route !== LOGIN_URL;
  }
}
