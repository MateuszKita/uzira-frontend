import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security/security.service';
import { take, switchMap, filter } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

const LOGIN_URL = '/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public tokenIsValid = false;
  public showMenu = true;
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
      .pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap((event: NavigationEnd) => {
          this.changeShowMenuValue(event.url);
          return this.securityService.checkTokenIsValid(this.token);
        })
      )
      .subscribe(isValid => {
        this.tokenIsValid = isValid;
        if (!this.tokenIsValid) {
          this.router.navigate(['login']);
        }
      });
  }

  private changeShowMenuValue(route: string): void {
    this.showMenu = route !== LOGIN_URL;
  }
}
