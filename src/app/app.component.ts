import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security/security.service';
import { take } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public tokenIsValid = false;
  private token: string;

  constructor(
    private readonly securityService: SecurityService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.securityService.getToken();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.securityService
          .chechTokenIsValid(this.token)
          .pipe(take(1))
          .subscribe(isValid => {
            console.log(isValid);
            this.tokenIsValid = isValid;
            if (!this.tokenIsValid) {
              this.router.navigate(['login']);
            }
          });
      }
    });
  }
}
