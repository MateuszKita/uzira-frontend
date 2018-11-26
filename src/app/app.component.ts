import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security/security.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';

const LOGIN_URL = '/login';

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
  ) {}

  ngOnInit(): void {
    this.checkTokenValidityOnNavigate();
  }

  private checkTokenValidityOnNavigate(): void {
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
