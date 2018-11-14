import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private username: string;
  private password: string;

  constructor(private router: Router) {}

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['backlog']);
    } else {
      alert('Invalid credentials');
    }
  }
}
