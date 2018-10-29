import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public token: string;

  constructor(private readonly securityService: SecurityService) {}

  ngOnInit(): void {
    this.token = this.securityService.getToken();
    console.log(this.token);
  }
}
